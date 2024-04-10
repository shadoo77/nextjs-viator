import { useParams } from 'next/navigation';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import axios from '@/axios';
import { queryKeys } from '@/tanstack/queryKeys';
import { Locale } from '@/i18nConfig';
import { SearchFilter, SearchResults } from '@/types/search';

type MutationFunctionProps = {
  locale: Locale;
  searchFilter: SearchFilter;
};

type Options = UseMutationOptions<SearchResults, Error, MutationFunctionProps, unknown[]>;

export const getSearchResult = async ({ locale, searchFilter }: MutationFunctionProps) => {
  const { data } = await axios.post<SearchResults>('/search/freetext', searchFilter, {
    headers: {
      'Accept-Language': locale
    }
  });
  return data;
};

export const useSearch = (searchFilter: SearchFilter, options: Options = {}) => {
  const { locale }: { locale: Locale } = useParams();

  return useMutation({
    mutationKey: [queryKeys.search, locale, searchFilter],
    mutationFn: getSearchResult,
    ...options
  });
};
