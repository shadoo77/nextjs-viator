import { SlidersHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Chip } from '@/components/atoms/Chip';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTags } from '@/tanstack/queries/tags';
import { useLocale } from '@/hooks/useLocale';
import { useQueryParams } from '@/hooks/useQueryParams';
import { Tag } from '@/types/tags';
import { durationOptions, getSortingOptions } from '@/lib/constants';
import RatingReview from '@/components/atoms/RatingReview';
import { Flag } from '@/types/products';

export function FilterSummary({
  tags,
  flags,
  rating,
  durationInMinutes,
  highestPrice
}: {
  tags?: number[];
  flags?: Flag[];
  rating?: { from?: number };
  durationInMinutes?: { from?: string | number; to?: string | number };
  highestPrice?: number;
}) {
  const { locale } = useLocale();
  const { t } = useTranslation();
  const { data } = useTags();
  const tagFilters = tags
    ?.map((tagId) => data?.find((tag) => tag.tagId === tagId))
    .filter((tag) => tag !== undefined) as Tag[];
  const { updatedPath, abstractPathname, getParams } = useQueryParams();

  const isSearchResultsPage = abstractPathname.endsWith('searchResults');
  const { sortingOptions } = getSortingOptions(isSearchResultsPage);
  const { sortType, sortOrder } = getParams();
  const sorting = sortingOptions.find(
    (option) => option.sort === sortType && option.order === sortOrder
  );

  const flagFilters = flags?.map((flag) => ({
    label: t(`flags.${flag}`),
    value: flag
  }));

  const clearTag = (tagId: number) => {
    updatedPath({
      updatedQuery: {
        tags: tags?.filter((tag) => tag !== tagId)
      }
    });
  };

  const clearFlag = (flag: string) => {
    updatedPath({
      updatedQuery: {
        flags: flags?.filter((f) => f !== flag)
      }
    });
  };

  const getDurationLabel = () => {
    if (!durationInMinutes) return '';
    const from = durationInMinutes.from ? Number(durationInMinutes.from) : undefined;
    const to = durationInMinutes.to ? Number(durationInMinutes.to) : undefined;
    const item = durationOptions.find((dur) => dur.from === from && dur.to === to);
    if (!item) return '';
    return t(`duration.${item.label}`);
  };

  if (!tags && !flags && !rating && !durationInMinutes && !highestPrice && !sorting) return null;

  return (
    <section className="mt-6 flex flex-col gap-4">
      <div className="flex h-5 items-center space-x-4">
        <div className="flex items-center justify-between gap-4 p-4">
          <span>
            <SlidersHorizontal className="h-6 w-6 text-primary" />
          </span>
          <span className="text-2xl font-bold">{t('filters.summary.title')}</span>
        </div>
        <Separator orientation="vertical" />
        <Button
          variant="link"
          onClick={() =>
            updatedPath({
              updatedQuery: {
                highestPrice: undefined,
                tags: undefined,
                flags: undefined,
                durationInMinutes: undefined,
                rating: undefined,
                sortType: undefined,
                sortOrder: undefined
              }
            })
          }
        >
          {t('filters.summary.clearAll')}
        </Button>
      </div>
      <div className="flex flex-wrap gap-3">
        {sortType && (
          <Chip
            label={t(`sort.${sorting?.id}`)}
            onClose={() =>
              updatedPath({ updatedQuery: { sortType: undefined, sortOrder: undefined } })
            }
          />
        )}
        {tagFilters &&
          tagFilters.map((tag, index) => (
            <Chip
              key={index}
              label={tag?.allNamesByLocale[locale] || ''}
              onClose={() => clearTag(tag?.tagId)}
            />
          ))}
        {flagFilters &&
          flagFilters.map((flag, index) => (
            <Chip key={index} label={flag.label} onClose={() => clearFlag(flag.value)} />
          ))}
        {highestPrice && (
          <Chip
            label={`${t('filters.summary.price')} ${highestPrice}€`}
            onClose={() => updatedPath({ updatedQuery: { highestPrice: undefined } })}
          />
        )}
        {durationInMinutes && (
          <Chip
            label={getDurationLabel()}
            onClose={() => updatedPath({ updatedQuery: { durationInMinutes: undefined } })}
          />
        )}
        {rating && rating.from && (
          <Chip
            label={
              <div className="flex items-center gap-2">
                <RatingReview averageRating={rating?.from} />
                {rating?.from?.toString() === '5' ? '' : '& up'}
              </div>
            }
            onClose={() => updatedPath({ updatedQuery: { rating: undefined } })}
          />
        )}
      </div>
    </section>
  );
}
