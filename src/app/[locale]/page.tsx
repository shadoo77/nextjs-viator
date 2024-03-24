import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
// page sections
import Hero from '@/components/organisms/Hero';
import FeatureSection from '@/components/organisms/FeatureSection';
import TopDestinations from '@/components/organisms/TopDestinations';

import getQueryClient from '@/tanstack/queryClient';
import { Locale } from '@/i18nConfig';
import { queryKeys } from '@/tanstack/queryKeys';
import { getDestinations } from '@/tanstack/queries/destinations';

export default async function Home({ params: { locale } }: { params: { locale: Locale } }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.destinations],
    queryFn: getDestinations
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="md:min-h-[calc(100vh-var(--navbar-height)-1px)] flex flex-col gap-6">
        {/* Hero */}
        <Hero />
        {/* Feature Section */}
        <FeatureSection />
        {/* Top Tours */}
        {/* Top Destinations */}
        <TopDestinations />
        {/* Top Attractions */}
      </div>
    </HydrationBoundary>
  );
}
