'use client';

import { useState, useEffect } from 'react';

// This hook is used to check if the code is running on the client side
export function useClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
