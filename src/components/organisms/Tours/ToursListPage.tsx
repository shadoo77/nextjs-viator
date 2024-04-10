'use client';

import { useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { useProductsSearch } from '@/tanstack/queries/productsSearch';
import { useCurrencyStore } from '@/store/currency';
import { Locale } from '@/i18nConfig';
import { useDestinationStore } from '@/store/destination';
import ToursList from '@/components/organisms/Tours/ToursList';
import { ProductSearchFilters } from '@/types/productSearchFilters';
import { usePagination } from '@/hooks/usePagination';

export default function ToursListPage() {
  const { t } = useTranslation();
  const { locale }: { locale: Locale } = useParams();
  const { currency } = useCurrencyStore((state) => ({ currency: state.currency }));
  const destination = useDestinationStore((state) => state.destination);

  const { pagination } = usePagination();

  const searchFilters: ProductSearchFilters = useMemo(
    () => ({
      filtering: {
        destination: destination?.destinationId.toString() || ''
      },
      pagination,
      currency
    }),
    [currency, destination?.destinationId, pagination]
  );

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
  }, [currency, destination, locale, mutate, searchFilters]);

  const isLoading = isPending || (!data && !error && !isPending);

  return (
    <div className="px-4 py-6">
      <h1 className="font-bold text-2xl my-4">
        {destination?.destinationName} {t('toursPage.tours')}
      </h1>
      <div className="flex gap-2 text-gray-500 overflow-auto">
        {Array.from({ length: 10 }).map((_, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="font-medium text-sm px-3 py-2 hover:border-1 hover:border-slate-700 cursor-pointer flex-auto min-w-fit"
          >{`Badge-${index + 1} jghghjg`}</Badge>
        ))}
      </div>
      <section className="flex gap-4 mt-6">
        <section className="hidden lg:flex lg:basis-1/4 bg-green-500">Filters</section>
        <ToursList searchResults={data} isLoading={isLoading} error={error} />
      </section>
    </div>
  );
}
