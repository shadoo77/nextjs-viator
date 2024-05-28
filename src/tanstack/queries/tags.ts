import { useQuery, keepPreviousData } from '@tanstack/react-query';
import axios from '@/axios';
import { queryKeys } from '@/tanstack/queryKeys';
import { Tag } from '@/types/tags';

type Response = { tags: Tag[] };

export const getTags = async () => {
  const { data } = await axios.get<Response>('/products/tags/');
  return data?.tags ?? [];
};

export const useTags = () =>
  useQuery({
    queryKey: [queryKeys.tags],
    queryFn: getTags,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    initialData: [],
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 60 * 24 * 7 // 1 week,
  });
