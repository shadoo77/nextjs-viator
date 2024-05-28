'use client';

import { useTranslation } from 'react-i18next';
import TourItem from './TourItem';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductSearchResults } from '@/types/products';
import Pagination from '@/components/molecules/Pagination';
import { toursPageCount } from '@/lib/constants';
import { ErrorAlert } from '@/components/molecules/ErrorAlert';

export default function ToursList({
  searchResults,
  isLoading,
  error
}: {
  searchResults: ProductSearchResults | undefined;
  isLoading: boolean;
  error: unknown;
}) {
  const { t } = useTranslation();
  const totalPages = Math.ceil((searchResults?.totalCount || 0) / toursPageCount);

  return (
    <section className="flex basis-full flex-col gap-4 overflow-hidden lg:basis-3/4">
      {isLoading &&
        Array.from({ length: 10 }).map((_, index) => (
          <div className="flex flex-nowrap gap-4" key={index}>
            <Skeleton className="h-[150px] w-[250px] rounded-xl" />
            <div className="flex-grow space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      {error instanceof Error && (
        <ErrorAlert
          title={t('error.title')}
          description={t('error.description')}
          withTryAgainButton
          className="col-span-12 mx-auto"
        />
      )}
      {searchResults && (
        <>
          <span className="text-sm text-slate-500">
            {t('toursPage.resultsFound', { count: searchResults.totalCount })}
          </span>

          <div className="flex flex-col gap-3 xs:grid xs:grid-cols-2 sm:flex sm:flex-col sm:gap-6">
            {searchResults.products.length > 0 ? (
              searchResults.products.map((product) => (
                <TourItem key={product.productCode} product={product} />
              ))
            ) : (
              <ErrorAlert title={t('toursPage.noResults')} className="col-span-12 mx-auto" />
            )}
          </div>
          <Pagination totalPages={totalPages} />
        </>
      )}
    </section>
  );
}
