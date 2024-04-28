import { useQuery, keepPreviousData, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import axios from '@/axios';
import { queryKeys } from '@/tanstack/queryKeys';
import { DestinationResponse } from '@/types/destinations';
import { Locale } from '@/i18nConfig';
import { useLocale } from '@/hooks/useLocale';

type Options<T> = Omit<UseQueryOptions<DestinationResponse, Error, T>, 'queryKey'>;

export const getDestinations = async ({ queryKey }: { queryKey: QueryKey }) => {
  const locale = queryKey[1] as Locale;
  const { data } = await axios.get<DestinationResponse>('/v1/taxonomy/destinations', {
    headers: {
      'Accept-Language': locale
    }
  });
  return data;
};

export const useDestinations = <T = DestinationResponse>(options?: Options<T>) => {
  const { locale } = useLocale();

  return useQuery({
    queryKey: [queryKeys.destinations, locale],
    queryFn: getDestinations,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week,
    ...options
  });
};
