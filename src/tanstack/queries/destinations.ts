import { useQuery, keepPreviousData } from '@tanstack/react-query';
import axios from '@/axios';
import { queryKeys } from '@/tanstack/queryKeys';
import { DestinationResponse } from '@/types/destinations';

export const getDestinations = async () => {
  const { data } = await axios.get<DestinationResponse>('/v1/taxonomy/destinations');
  return data;
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
