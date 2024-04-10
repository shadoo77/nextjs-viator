'use client';

import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import TourItem from './TourItem';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductSearchResults } from '@/types/products';
import Pagination from '@/components/molecules/Pagination';
import { toursPageCount } from '@/lib/constants';

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
  const pathname = usePathname();
  const totalPages = Math.ceil((searchResults?.totalCount || 0) / toursPageCount);

  return (
    <section className="basis-full lg:basis-3/4 flex flex-col gap-4">
      {isLoading &&
        Array.from({ length: 10 }).map((_, index) => (
          <div className="flex flex-nowrap gap-4" key={index}>
            <Skeleton className="h-[150px] w-[250px] rounded-xl" />
            <div className="space-y-2 flex-grow">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      {error instanceof Error && (
        <div className="flex justify-center mx-auto col-span-12">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t('toursPage.noResults')}</AlertTitle>
          </Alert>
        </div>
      )}
      {searchResults && (
        <>
          <span className="text-sm text-slate-500">
            {t('toursPage.resultsFound', { count: searchResults.totalCount })}
          </span>

          <div className="flex flex-col gap-3 sm:gap-6 xs:grid xs:grid-cols-2 sm:flex sm:flex-col">
            {searchResults.products.map((product) => (
              <TourItem key={product.productCode} product={product} />
            ))}
          </div>
          <Pagination pathname={pathname} totalPages={totalPages} />
        </>
      )}
    </section>
  );
}
