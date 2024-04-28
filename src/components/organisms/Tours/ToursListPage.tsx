'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { useProductsSearch } from '@/tanstack/queries/productsSearch';
import ToursList from '@/components/organisms/Tours/ToursList';
import { Destination } from '@/types/destinations';
import { useLocale } from '@/hooks/useLocale';
import { useProductSearchFilters } from '@/hooks/useProductSearchFilters';

export default function ToursListPage({ destination }: { destination: Destination }) {
  const { t } = useTranslation();
  const { locale } = useLocale();

  const searchFilters = useProductSearchFilters({ destination });

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

  const isLoading = isPending || (!data && !error && !isPending);

  return (
    <div className="px-4 py-6">
      <h1 className="my-4 text-2xl font-bold">
        {destination?.destinationName} {t('toursPage.tours')}
      </h1>
      <div className="flex gap-2 overflow-auto text-gray-500">
        {Array.from({ length: 10 }).map((_, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="hover:border-1 min-w-fit flex-auto cursor-pointer px-3 py-2 text-sm font-medium hover:border-slate-700"
          >{`Badge-${index + 1} jghghjg`}</Badge>
        ))}
      </div>
      <section className="mt-6 flex gap-4">
        <section className="hidden bg-green-500 lg:flex lg:basis-1/4">Filters</section>
        <ToursList searchResults={data} isLoading={isLoading} error={error} />
      </section>
    </div>
  );
}
