'use client';

import { ReactNode, useEffect } from 'react';
import { Destination } from '@/types/destinations';
import { useDestinationStore } from '@/store/destination';

export default function DestinationInitializer({
  children,
  destination
}: {
  children: ReactNode;
  destination: Destination;
}) {
  useEffect(() => {
    if (destination) {
      useDestinationStore.setState({ destination });
    }
  }, [destination]);

  return children;
}
