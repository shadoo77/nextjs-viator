import { useQuery, keepPreviousData } from '@tanstack/react-query';
import axios from '@/axios';
import { queryKeys } from '@/tanstack/queryKeys';
import { isSSR } from '@/lib/utils';
import { DestinationResponse } from '@/types/destinations';

export const getDestinations = async () => {
  try {
    const { data } = await axios.get<DestinationResponse>('/v1/taxonomy/destinations', {
      headers: { 'Accept-Language': 'fr' }
    });
    return data.data;
  } catch (error) {
    if (!isSSR) throw error;
    return undefined;
  }
};

export const useDestination = () =>
  useQuery({
    queryKey: [queryKeys.destinations],
    queryFn: getDestinations,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    placeholderData: keepPreviousData,
    staleTime: Infinity
  });
