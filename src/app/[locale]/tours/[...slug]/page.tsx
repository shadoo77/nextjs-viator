import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import TestSingleTour from './TestSingleTour';
import { Locale } from '@/i18nConfig';
import getQueryClient from '@/tanstack/queryClient';
import { queryKeys } from '@/tanstack/queryKeys';
import { getProduct } from '@/tanstack/queries/product';
import ToursListPage from '@/components/organisms/Tours/ToursListPage';

export default async function Page({
  params: { locale, slug }
}: {
  params: { locale: Locale; slug: string[] };
}) {
  const queryClient = getQueryClient();
  // const destinationUrlName = slug[0];
  // const destinationId = slug[1].replace('did-', '');
  // const res = await getDestinations({ queryKey: [queryKeys.destinations, locale] });
  // const destination = res.data.find((d) => d.destinationId === Number(destinationId));

  if (slug.length === 3) {
    const productCode = slug[2].replace('tid-', '');

    await queryClient.prefetchQuery({
      queryKey: [queryKeys.product, locale, productCode],
      queryFn: getProduct
    });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TestSingleTour productCode={productCode} />
      </HydrationBoundary>
    );
  }

  return <ToursListPage />;
}
