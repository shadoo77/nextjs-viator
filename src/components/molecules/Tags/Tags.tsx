import { useTranslation } from 'react-i18next';
import { TreeViewData, findPath, getTagsListTrees } from './helpers';
import { useTags } from '@/tanstack/queries/tags';
import { Product } from '@/types/products';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { useLocale } from '@/hooks/useLocale';
import { cn } from '@/lib/utils';
import { useQueryParams } from '@/hooks/useQueryParams';

export default function Tags({
  products,
  activeTags = []
}: {
  products: Product[];
  activeTags?: number[];
}) {
  const { locale } = useLocale();
  const { t } = useTranslation();
  const { data: tags } = useTags();
  const tagTrees = getTagsListTrees(products, tags);

  const itemsPath = [...new Set(activeTags.flatMap((tagId) => findPath(tagTrees, tagId)))];
  const { updatedPath } = useQueryParams();

  const handleClickedTag = (tagId: number) => {
    const combinedTags = activeTags.includes(tagId)
      ? activeTags.filter((tag) => tag !== tagId)
      : [...new Set([...activeTags, tagId])];

    updatedPath({ updatedQuery: { tags: combinedTags } });
  };

  const RecursiveAccordion = ({
    data,
    isChild = false,
    defaultValue
  }: {
    data: TreeViewData;
    defaultValue?: string[];
    isChild?: boolean;
  }) => {
    if (!data.children) {
      return (
        <div
          className={cn('cursor-pointer py-1 text-sm font-light hover:underline', {
            'ml-4': isChild,
            'font-medium underline': activeTags.includes(data.tagId)
          })}
          onClick={() => handleClickedTag(data.tagId)}
        >
          {data.allNamesByLocale[locale]}
        </div>
      );
    }

    return (
      <AccordionItem
        value={data.tagId.toString()}
        className={cn('border-b-0 py-1 text-sm font-light [&_button]:py-0', {
          'ml-4': isChild
        })}
      >
        <AccordionTrigger
          className={cn('font-light', {
            'font-medium underline': activeTags.includes(data.tagId)
          })}
        >
          <span onClick={() => handleClickedTag(data.tagId)}>{data.allNamesByLocale[locale]}</span>
        </AccordionTrigger>
        {data.children && (
          <AccordionContent className="py-0">
            <Accordion
              type="multiple"
              className="w-full"
              defaultValue={defaultValue}
              orientation="vertical"
            >
              {data.children.map((child) => (
                <RecursiveAccordion key={child.tagId} data={child} isChild />
              ))}
            </Accordion>
          </AccordionContent>
        )}
      </AccordionItem>
    );
  };

  return (
    <section className="py-4">
      <h2 className="mb-2 text-xl font-bold">{t('filters.categories')}</h2>
      <Accordion type="multiple" className="w-full" defaultValue={itemsPath} orientation="vertical">
        {tagTrees.map((tree) => (
          <RecursiveAccordion key={tree.tagId} data={tree} defaultValue={itemsPath} />
        ))}
      </Accordion>
    </section>
  );
}
