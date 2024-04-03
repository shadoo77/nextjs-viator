import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
// page sections
import Hero from '@/components/organisms/Hero';
import FeatureSection from '@/components/organisms/FeatureSection';
import PopularDestinations from '@/components/organisms/PopularDestinations';
import RecommendedTours from '@/components/organisms/RecommendedTours';

import getQueryClient from '@/tanstack/queryClient';
import { Locale } from '@/i18nConfig';
import { queryKeys } from '@/tanstack/queryKeys';
import { getBlock } from '@/tanstack/queries/block';

export default async function Home({ params: { locale } }: { params: { locale: Locale } }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.block, locale, 'popular_destinations'],
    queryFn: getBlock
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="md:min-h-[calc(100vh-var(--navbar-height)-1px)] flex flex-col gap-6">
        {/* Hero */}
        <Hero />
        {/* Feature Section */}
        <FeatureSection />
        {/* Popular Destinations */}
        <PopularDestinations locale={locale} />
        {/* Top Tours */}
        <RecommendedTours locale={locale} />
      </div>
    </HydrationBoundary>
  );
}
