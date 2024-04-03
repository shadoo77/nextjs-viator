import { useQuery, keepPreviousData } from '@tanstack/react-query';
import axios from '@/axios';
import { queryKeys } from '@/tanstack/queryKeys';
import { DestinationResponse } from '@/types/destinations';
import { Locale } from '@/i18nConfig';

export const getDestinations = async ({ queryKey }: { queryKey: unknown[] }) => {
  const locale = queryKey[1] as Locale;
  const { data } = await axios.get<DestinationResponse>('/v1/taxonomy/destinations', {
    headers: {
      'Accept-Language': locale
    }
  });
  return data;
};

export const useDestination = (locale: Locale) =>
  useQuery({
    queryKey: [queryKeys.destinations, locale],
    queryFn: getDestinations,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    placeholderData: keepPreviousData,
    staleTime: Infinity
  });
