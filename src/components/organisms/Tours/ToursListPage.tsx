'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2, SlidersHorizontal } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';
import { useProductsSearch } from '@/tanstack/queries/productsSearch';
import ToursList from '@/components/organisms/Tours/ToursList';
import { Destination } from '@/types/destinations';
import { useLocale } from '@/hooks/useLocale';
import { useProductSearchFilters } from '@/hooks/useProductSearchFilters';
import { SearchForm } from '@/components/organisms/SearchForm';
import { Filters } from '@/components/organisms/Filters';
import { FilterSummary } from '@/components/organisms/Filters/FilterSummary';
import { Button } from '@/components/ui/button';
import { getActiveFiltersCount } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useClient } from '@/hooks/useClient';

export default function ToursListPage({ destination }: { destination: Destination }) {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const matchMinLg = useMediaQuery('(min-width: 1024px)');
  const isClient = useClient();

  const searchFilters = useProductSearchFilters({ destination });
  const filtersCount = getActiveFiltersCount(searchFilters.filtering);

  const { data, isPending, mutate, error } = useProductsSearch({
    searchFilters,
    params: { 'campaign-value': 'JUNE' }
  });

  useEffect(() => {
    destination &&
      mutate({
        locale,
        searchFilters,
        params: { 'campaign-value': 'JUNE' }
      });
  }, [destination, locale, mutate, searchFilters]);

  useEffect(() => {
    if (matchMinLg) {
      setMobileFiltersOpen(false);
    }
  }, [matchMinLg]);

  return (
    <div className="px-4 py-6">
      <SearchForm destination={destination} />
      <div className="flex items-center justify-between">
        <h1 className="my-4 text-3xl font-bold">
          {destination?.destinationName} {t('toursPage.tours')}
        </h1>
        <Button
          variant="customOutline"
          className="relative only:-mx-5 lg:hidden"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <SlidersHorizontal className="mr-2 h-5 w-6 text-primary" />
          {t('filters.summary.title')}
          {filtersCount > 0 && (
            <span className="absolute -right-2 -top-2 inline-flex items-center justify-center gap-1 rounded-full bg-destructive px-1.5 text-xs text-white">
              {filtersCount}
              <span className="sr-only">Filters count</span>
            </span>
          )}
        </Button>
      </div>
      {isClient && matchMinLg && <FilterSummary filters={searchFilters.filtering} />}
      <section className="mt-6 flex gap-4">
        <section className="hidden basis-0 lg:flex lg:basis-1/4">
          <Filters searchResults={data} filters={searchFilters.filtering} />
        </section>
        <ToursList searchResults={data} isLoading={isPending} error={error} />
      </section>
      {/** Mobile filters */}
      <Dialog open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <DialogContent className="z-top-navbar flex h-full w-screen max-w-screen-sm flex-col overflow-auto px-4 sm:h-[calc(100%-var(--navbar-height))] [&_li]:px-0 [&_ul]:p-0">
          <DialogHeader>
            <DialogTitle>{t('filters.summary.title')}</DialogTitle>
          </DialogHeader>
          <div className="flex-grow overflow-auto py-4">
            <FilterSummary filters={searchFilters.filtering} />
            <Filters searchResults={data} filters={searchFilters.filtering} />
          </div>
          <DialogFooter className="absolute bottom-3 left-0 right-0 z-10 w-full overflow-hidden border-t border-slate-300 bg-white p-3 pb-0">
            <Button
              onClick={() => setMobileFiltersOpen(false)}
              disabled={isPending}
              className="text-base font-bold sm:mx-auto"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('seeResults', { count: data?.totalCount })}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
