'use client';

import { useTranslation } from 'react-i18next';
import { useIsClient, useMediaQuery } from 'usehooks-ts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ProductSorting } from '@/types/search';
import { useQueryParams } from '@/hooks/useQueryParams';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { getSortingOptions, type SortingOptionIds } from '@/lib/constants';

export default function Sorting({ isInFilters = false }: { isInFilters?: boolean }) {
  const matchMinLg = useMediaQuery('(min-width: 1024px)');
  const { updatedPath, abstractPathname, getParams } = useQueryParams();
  const isSearchResultsPage = abstractPathname.endsWith('searchResults');

  const { sortType, sortOrder } = getParams();
  const { sortingOptions } = getSortingOptions(isSearchResultsPage);

  let defaultValue = sortingOptions[0].id;

  if (sortType) {
    defaultValue =
      sortingOptions.find((option) => option.sort === sortType && option.order === sortOrder)?.id ||
      sortingOptions[0].id;
  }

  const { t } = useTranslation();
  const isClient = useIsClient();

  const handleChange = (value: SortingOptionIds) => {
    if (value === 'featured') {
      updatedPath({ updatedQuery: { sortType: undefined, sortOrder: undefined } });
      return;
    }
    const { sort, order } = sortingOptions.find(({ id }) => id === value) as ProductSorting;
    updatedPath({ updatedQuery: { sortType: sort, sortOrder: order } });
  };

  if (!isClient) {
    return null;
  }

  if ((isInFilters && matchMinLg) || (!isInFilters && !matchMinLg)) {
    return null;
  }

  if (isInFilters && !matchMinLg) {
    return (
      <section className="py-4">
        <div className="flex justify-between">
          <h2 className="mb-2 text-xl font-bold">{t('filters.duration')}</h2>
          {sortType && (
            <Button
              className="text-primary-500 hover:underline"
              variant="link"
              onClick={() =>
                updatedPath({ updatedQuery: { sortType: undefined, sortOrder: undefined } })
              }
            >
              {t('clear')}
            </Button>
          )}
        </div>
        <RadioGroup defaultValue={defaultValue} value={defaultValue} onValueChange={handleChange}>
          {sortingOptions.map(({ id }) => (
            <div className="flex items-center space-x-2 text-slate-500" key={id}>
              <RadioGroupItem value={id} id={id} />
              <Label htmlFor={id}>{t(`sort.${id}`)}</Label>
            </div>
          ))}
        </RadioGroup>
      </section>
    );
  }

  return (
    <div className="z-10 flex flex-nowrap items-center gap-2">
      <span className="shrink-0 text-sm text-slate-500">{t('sort.title')}</span>
      <Select onValueChange={handleChange} defaultValue={defaultValue}>
        <SelectTrigger>
          <SelectValue
            placeholder="Sort by"
            className="flex flex-row flex-nowrap justify-between gap-2"
          />
        </SelectTrigger>
        <SelectContent>
          {sortingOptions.map(({ id }) => (
            <SelectItem key={id} value={id}>
              {t(`sort.${id}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
