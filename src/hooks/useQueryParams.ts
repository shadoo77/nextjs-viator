'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'qs';
import { isEmpty } from '@/lib/utils';

export function useQueryParams(queryObject: Record<string, any> = {}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Get the path and queryString with the current query params
  const getSearchQuery = useCallback(
    (qObject: Record<string, any>) => {
      const params = qs.parse(searchParams.toString(), { allowEmptyArrays: false });
      if (isEmpty(qObject)) {
        const path = params.toString() ? `${pathname}?${params.toString()}` : pathname;
        return { path, queryString: params.toString() };
      }

      const queryString = qs
        .stringify(
          { ...params, ...qObject },
          {
            skipNulls: true,
            encode: false,
            filter: (prefix, value) => {
              if (typeof value === 'string' && !value.trim()) {
                return;
              }
              return value;
            }
          }
        )
        .toString();

      const path = queryString ? `${pathname}?${queryString}` : pathname;
      return { path, queryString };
    },
    [searchParams, pathname]
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

  // Get current path with new query params
  const getUpdatedPath = (updatedQuery: Record<string, any> = {}) =>
    getSearchQuery(updatedQuery).path;

  // Get all query params
  const getParams = () => qs.parse(searchParams.toString(), { allowEmptyArrays: false });

  // Clear all query params
  const clearQueryParams = () => router.replace(pathname);

  return {
    updatedPath,
    clearQueryParams,
    getUpdatedPath,
    getParams,
    abstractPathname: pathname,
    ...pathInfo
  };
}
