import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import Hero from '@/components/organisms/Hero';
import FeatureSection from '@/components/organisms/FeatureSection';
import getQueryClient from '@/tanstack/queryClient';
import { Locale } from '@/i18nConfig';

export default async function Home({ locale }: { locale: Locale }) {
  const queryClient = getQueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: [queryKeys.scheme],
  //   queryFn: () => axios.get('/channels/eukdlx/scheme').then((response) => response.data)
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="md:min-h-[calc(100vh-var(--navbar-height)-1px)] h-[1000px] flex flex-col gap-6">
        {/* Hero */}
        <Hero />
        {/* Feature Section */}
        <FeatureSection />
        {/* Top Tours */}
        {/* Warm Destinations */}
        {/* Top Destinations */}
        {/* Top Attractions */}
      </div>
    </HydrationBoundary>
  );
}
