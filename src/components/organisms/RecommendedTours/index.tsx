'use client';

import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LuAlertCircle } from 'react-icons/lu';
import SectionWithTitle from '@/components/templates/SectionWithTitle';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearch } from '@/tanstack/queries/search';
import { SearchFilter } from '@/types/search';
import { Locale } from '@/i18nConfig';
import CarouselTestimonial from '@/components/organisms/RecommendedTours/CarouselTestimonial';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function RecommendedTours({ locale }: { locale: Locale }) {
  const { t } = useTranslation();
  const productsNumber = 9;

  const searchFilter: SearchFilter = useMemo(
    () => ({
      searchTerm: '*',
      searchTypes: [{ searchType: 'PRODUCTS', pagination: { start: 1, count: productsNumber } }],
      productSorting: { sort: 'REVIEW_AVG_RATING', order: 'DESCENDING' }
    }),
    []
  );

  const { data, error, isPending, mutate } = useSearch(searchFilter);

  useEffect(() => {
    mutate({ locale, searchFilter });
  }, [locale, mutate, searchFilter]);

  return (
    <SectionWithTitle title={t('homePage.recommendedTours.title')}>
      {(isPending || error) && (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          {error instanceof Error && (
            <div className="flex justify-center mx-auto col-span-8">
              <Alert variant="destructive">
                <LuAlertCircle className="h-4 w-4" />
                <AlertTitle>{t('error.title')}</AlertTitle>
                <AlertDescription>{t('error.description')}</AlertDescription>
              </Alert>
            </div>
          )}
          {isPending &&
            new Array(8).fill(0).map((_, index) => (
              <div className="col-span-2" key={index}>
                <Skeleton className="w-full h-32" />
              </div>
            ))}
        </div>
      )}
      {!data ? null : <CarouselTestimonial products={data.products.results} />}
    </SectionWithTitle>
  );
}
