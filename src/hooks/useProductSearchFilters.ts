'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import qs from 'qs';
import { usePagination } from '@/hooks/usePagination';
import { Destination } from '@/types/destinations';
import { ProductSearchFilters } from '@/types/productSearchFilters';
import { useUserPreferences } from '@/store/userPreferences';

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

export function useProductSearchFilters({ destination }: { destination: Destination }) {
  const searchParams = useSearchParams();

  const currency = useUserPreferences((state) => state.currency);
  const { pagination } = usePagination();

  return useMemo(() => {
    const params = qs.parse(searchParams.toString(), { allowEmptyArrays: false });
    const obj: ProductSearchFilters = {
      filtering: {
        destination: destination.destinationId.toString()
      },
      pagination,
      currency
    };
    if (params.tags && getArrayParam({ param: params.tags, isArrayOfNumbers: true })) {
      obj.filtering.tags = getArrayParam({ param: params.tags, isArrayOfNumbers: true });
    }
    if (params.flags && getArrayParam({ param: params.flags })) {
      obj.filtering.flags = getArrayParam({ param: params.flags });
    }
    if (params.confirmationType && getParam({ param: params.confirmationType })) {
      obj.filtering.confirmationType = getParam({ param: params.confirmationType });
    }
    if (params.rating && getObjectParam({ param: params.rating, requiredKeys: [] })) {
      obj.filtering.rating = getObjectParam({ param: params.rating, requiredKeys: [] });
    }
    if (
      params.durationInMinutes &&
      getObjectParam({
        param: params.durationInMinutes,
        requiredKeys: []
      })
    ) {
      obj.filtering.durationInMinutes = getObjectParam({
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
      obj.filtering.includeAutomaticTranslations = getParam({
        param: params.includeAutomaticTranslations,
        isBoolean: true
      });
    }
    if (params.attractionId && getParam({ param: params.attractionId, isNumber: true })) {
      obj.filtering.attractionId = getParam({ param: params.attractionId, isNumber: true });
    }
    if (params.lowestPrice && getParam({ param: params.lowestPrice, isNumber: true })) {
      obj.filtering.lowestPrice = getParam({ param: params.lowestPrice, isNumber: true });
    }
    if (params.highestPrice && getParam({ param: params.highestPrice, isNumber: true })) {
      obj.filtering.highestPrice = getParam({ param: params.highestPrice, isNumber: true });
    }
    if (params.startDate && getParam({ param: params.startDate })) {
      obj.filtering.startDate = getParam({ param: params.startDate });
    }
    if (params.endDate && getParam({ param: params.endDate })) {
      obj.filtering.endDate = getParam({ param: params.endDate });
    }
    if (
      params.sorting &&
      getObjectParam({ param: params.sorting, requiredKeys: ['sort', 'order'] })
    ) {
      obj.sorting = getObjectParam({ param: params.sorting, requiredKeys: ['sort', 'order'] });
    }

    return obj;
  }, [currency, destination.destinationId, pagination, searchParams]);
}
