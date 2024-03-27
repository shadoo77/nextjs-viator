import { useQuery, keepPreviousData } from '@tanstack/react-query';
import axios from '@/axios';
import { queryKeys } from '@/tanstack/queryKeys';
import { getServerApiUrlByHost, isSSR } from '@/lib/utils';
import { DestinationResponse } from '@/types/destinations';

export const getDestinations = async () => {
  try {
    const url = await getServerApiUrlByHost('/v1/taxonomy/destinations');

    console.log('>>>>>>>>>>>>>>>>>>>>>>> url >>>>>> ', { url });

    const { data } = await axios.get<DestinationResponse>(url, {
      headers: { 'Accept-Language': 'fr' }
    });
    console.log('>>>>>>>>>>>>>>>>>>>>>>> data >>>>>> ', { data });
    return data;
  } catch (error) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>> error >>>>>> ', { error });
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
