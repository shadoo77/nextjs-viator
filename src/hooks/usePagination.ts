'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { toursPageCount } from '@/lib/constants';
import { Pagination } from '@/types/search';

export function usePagination() {
  const pageParam = useSearchParams().get('page');

  const activePage = pageParam && !isNaN(Number(pageParam)) ? Number(pageParam) : 1;

  const pagination: Pagination = useMemo(
    () => ({
      start: (activePage - 1) * toursPageCount + 1,
      count: toursPageCount
    }),
    [activePage]
  );

  return {
    activePage,
    pagination
  };
}
