'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { isEmpty } from '@/lib/utils';

/**
 * Hook to get the query params of the current URL.
 * @param updatedQuery - Object with the updated query params.
 * @returns The updated path and updatePath method.
 */
export function useQueryParams2(queryObject: Record<string, any> = {}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Get the path and queryString with the current query params
  const getSearchQuery = useCallback(
    (obj: Record<string, any>) => {
      const params = new URLSearchParams(searchParams);
      if (!obj || isEmpty(obj)) {
        const path = params.toString() ? `${pathname}?${params.toString()}` : pathname;
        return { path, queryString: params.toString() };
      }
      Object.keys(obj).forEach((key) => {
        const query = typeof obj[key] === 'string' ? obj[key].trim() : obj[key];
        if (query !== null && query !== undefined && query !== '') {
          params.set(key, query);
        } else {
          params.delete(key);
        }
      });
      const queryString = params.toString();
      const path = queryString ? `${pathname}?${queryString}` : pathname;
      return { path, queryString };
    },
    [pathname, searchParams]
  );

  const pathInfo = useMemo(() => {
    return getSearchQuery(queryObject);
  }, [getSearchQuery, queryObject]);

  // Update the path with the new query params.
  const updatedPath = ({
    scroll = false,
    updatedQuery = {}
  }: {
    scroll?: boolean;
    updatedQuery?: Record<string, any>;
  } = {}) => {
    const newPath = isEmpty(updatedQuery) ? pathInfo.path : getSearchQuery(updatedQuery).path;
    router.replace(newPath, { scroll });
  };

  return { ...pathInfo, updatedPath };
}
