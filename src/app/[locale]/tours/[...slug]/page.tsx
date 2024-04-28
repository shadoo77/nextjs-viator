import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { Locale } from '@/i18nConfig';
import getQueryClient from '@/tanstack/queryClient';
import { queryKeys } from '@/tanstack/queryKeys';
import { getProduct } from '@/tanstack/queries/product';
import { currencyFallback } from '@/lib/constants';
import { getDestinations } from '@/tanstack/queries/destinations';
import Container from '@/components/organisms/Tours/Container';

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
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.destinations, locale],
    queryFn: getDestinations
  });

  const destinationId = slug[1].replace('did-', '').trim();
  const productCode = slug[2] ? slug[2].replace('tid-', '').trim() : '';

  const isProductPage = slug.length === 3;

  if (isProductPage) {
    const currency = cookies().get('currency') || currencyFallback;
    await queryClient.prefetchQuery({
      queryKey: [queryKeys.product, locale, productCode],
      queryFn: getProduct
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container
        destinationId={destinationId}
        productCode={productCode}
        isProductPage={isProductPage}
      />
    </HydrationBoundary>
  );
}
