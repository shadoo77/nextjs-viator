'use client';

import Hero from '@/components/organisms/Hero';
import FeatureSection from '@/components/organisms/FeatureSection';

export default function HomePage() {
  return (
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
  );
}
