'use client';

import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SectionWithTitle from '@/components/templates/SectionWithTitle';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearch } from '@/tanstack/queries/search';
import { SearchFilter } from '@/types/search';
import { Locale } from '@/i18nConfig';
import CarouselTestimonial from '@/components/organisms/RecommendedTours/CarouselTestimonial';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ErrorAlert } from '@/components/molecules/ErrorAlert';
import { useUserPreferences } from '@/store/userPreferences';

export default function RecommendedTours({ locale }: { locale: Locale }) {
  const { t } = useTranslation();
  const currency = useUserPreferences((state) => state.currency);
  const productsNumber = 9;

  const searchFilter: SearchFilter = useMemo(
    () => ({
      searchTerm: '*',
      searchTypes: [{ searchType: 'PRODUCTS', pagination: { start: 1, count: productsNumber } }],
      productSorting: { sort: 'REVIEW_AVG_RATING', order: 'DESCENDING' },
      currency
    }),
    [currency]
  );

  const { data, error, isPending, mutate } = useSearch(searchFilter);

  useEffect(() => {
    mutate({ locale, searchFilter });
  }, [locale, mutate, searchFilter]);

  return (
    <SectionWithTitle title={t('homePage.recommendedTours.title')}>
      {(isPending || error) && (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-8">
          {error instanceof Error && (
            <ErrorAlert
              title={t('error.title')}
              description={t('error.description')}
              withTryAgainButton
              className="col-span-8 mx-auto"
            />
          )}
          {isPending &&
            new Array(8).fill(0).map((_, index) => (
              <div className="col-span-2" key={index}>
                <Skeleton className="h-32 w-full" />
              </div>
            ))}
        </div>
      )}
      {!data ? null : <CarouselTestimonial products={data.products.results} />}
    </SectionWithTitle>
  );
}
