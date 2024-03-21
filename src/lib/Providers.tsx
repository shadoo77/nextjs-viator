'use client';

import React, { PropsWithChildren, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import getQueryClient from '@/tanstack/queryClient';

export default function Providers({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  const [client] = useState(queryClient);

  // TODO: enable persist again later, now disabled for development
  // useEffect(() => {
  //   useStepsStore.persist.rehydrate();
  // }, []);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
