'use client';

import { ReactNode, useEffect } from 'react';
import { Destination } from '@/types/destinations';
import { useDestinationStore } from '@/store/destination';

export default function DestinationInitializer({
  children,
  destination,
  location
}: {
  children: ReactNode;
  destination: Destination;
  location: {
    city: string;
    region: string;
    country: string;
  };
}) {
  useEffect(() => {
    if (destination) {
      useDestinationStore.setState({ destination, location });
    }
  }, [destination, location]);

  return children;
}
