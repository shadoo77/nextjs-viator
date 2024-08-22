'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import qs from 'qs';
import { usePagination } from '@/hooks/usePagination';
import { useUserPreferences } from '@/store/userPreferences';
import { SearchFilter } from '@/types/search';

type Param = string | string[] | qs.ParsedQs | qs.ParsedQs[] | undefined;

// get array param
const getArrayParam = <T>({
  param,
  isArrayOfNumbers
}: {
  param: Param;
  isArrayOfNumbers?: boolean;
}) => {
  if (!(param && Array.isArray(param))) return undefined;
  if (isArrayOfNumbers) {
    const paramArrayFiltered = param.map((p) => Number(p)).filter((p) => !isNaN(p));
    return paramArrayFiltered.length ? (paramArrayFiltered as T) : undefined;
  }
  return param.length ? (param as T) : undefined;
};

// get object param
const getObjectParam = <T>({ param, requiredKeys }: { param: Param; requiredKeys: string[] }) => {
  if (!(param && typeof param === 'object')) return undefined;
  const paramKeys = Object.keys(param);
  if (!requiredKeys.every((key) => paramKeys.includes(key))) return undefined;
  return param as T;
};

// get sigle param
const getParam = <T>({
  param,
  isBoolean,
  isNumber
}: {
  param: Param;
  isBoolean?: boolean;
  isNumber?: boolean;
}) => {
  if (!param || typeof param !== 'string') return undefined;
  if (isBoolean) return (param === 'true') as T;
  if (isNumber) return isNaN(Number(param)) ? undefined : (Number(param) as T);
  return param as T;
};

export function useSearchFilters({ searchTerm }: { searchTerm: string }) {
  const searchParams = useSearchParams();

  const currency = useUserPreferences((state) => state.currency);
  const { pagination } = usePagination();

  return useMemo(() => {
    const params = qs.parse(searchParams.toString(), { allowEmptyArrays: false });
    const obj: SearchFilter = {
      searchTerm,
      searchTypes: [{ searchType: 'PRODUCTS', pagination }],
      productFiltering: {},
      productSorting: { sort: 'DEFAULT', order: 'DESCENDING' },
      currency
    };

    const productFiltering: SearchFilter['productFiltering'] = {};

    if (params.flags && getArrayParam({ param: params.flags })) {
      productFiltering.flags = getArrayParam({ param: params.flags });
    }
    if (params.rating && getObjectParam({ param: params.rating, requiredKeys: [] })) {
      productFiltering.rating = getObjectParam({ param: params.rating, requiredKeys: [] });
    }
    if (
      params.durationInMinutes &&
      getObjectParam({
        param: params.durationInMinutes,
        requiredKeys: []
      })
    ) {
      productFiltering.durationInMinutes = getObjectParam({
        param: params.durationInMinutes,
        requiredKeys: []
      });
    }
    if (
      params.includeAutomaticTranslations &&
      getParam({
        param: params.includeAutomaticTranslations,
        isBoolean: true
      })
    ) {
      productFiltering.includeAutomaticTranslations = getParam({
        param: params.includeAutomaticTranslations,
        isBoolean: true
      });
    }
    if (params.destination && getParam({ param: params.destination })) {
      productFiltering.destination = getParam({ param: params.destination });
    }
    if (params.dateRange && getObjectParam({ param: params.dateRange, requiredKeys: [] })) {
      productFiltering.dateRange = getObjectParam({ param: params.dateRange, requiredKeys: [] });
    }
    if (params.price && getObjectParam({ param: params.price, requiredKeys: [] })) {
      productFiltering.price = getObjectParam({ param: params.price, requiredKeys: [] });
    }
    if (params.rating && getObjectParam({ param: params.rating, requiredKeys: [] })) {
      productFiltering.rating = getObjectParam({ param: params.rating, requiredKeys: [] });
    }
    obj.productFiltering = productFiltering;

    if (params.sortType) {
      const sort = params.sortType as
        | 'DEFAULT'
        | 'ITINERARY_DURATION'
        | 'PRICE'
        | 'REVIEW_AVG_RATING'
        | 'DATE_ADDED';
      const productSorting: SearchFilter['productSorting'] = {
        sort
      };
      if (params.sortOrder) {
        productSorting.order = params.sortOrder as 'ASCENDING' | 'DESCENDING';
      }
      obj.productSorting = productSorting;
    }

    return obj;
  }, [currency, pagination, searchParams, searchTerm]);
}
