'use client';

import { notFound, redirect, useParams } from 'next/navigation';
import TestSingleTour from '@/app/[locale]/tours/[...slug]/TestSingleTour';
import ToursListPage from '@/components/organisms/Tours/ToursListPage';
import { Locale } from '@/i18nConfig';
import { useDestinations } from '@/tanstack/queries/destinations';

export default function Container({
  destinationId,
  productCode,
  isProductPage
}: {
  destinationId: string;
  productCode: string;
  isProductPage: boolean;
}) {
  const { locale, slug }: { locale: Locale; slug: string[] } = useParams();

  const { data: destination } = useDestinations({
    select: (data) => {
      return data.data.find((d) => d.destinationId === Number(destinationId));
    }
  });

  if (!destination) notFound();

  if (slug[0].toLowerCase() !== destination.destinationUrlName.toLowerCase()) {
    return redirect(
      `/${locale}/tours/${destination.destinationUrlName}/${slug.slice(1).join('/')}`
    );
  }

  if (isProductPage) {
    return <TestSingleTour productCode={productCode} />;
  }

  return <ToursListPage destination={destination} />;
}
