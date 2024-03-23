import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import axios from '@/axios';
import { queryKeys } from '@/tanstack/queryKeys';
import { isSSR } from '@/lib/utils';
import { Attraction } from '@/types/attractions';

import { Locale } from '@/i18nConfig';

// type Data = { valid: boolean };
type Options = UseMutationOptions<any, Error, string, unknown>;

export const getAttractions = async (locale: Locale): Promise<any> => {
  try {
    const body = {
      searchTerm: 'antalya',
      searchTypes: [
        {
          searchType: 'ATTRACTIONS',
          pagination: {
            start: 1,
            count: 10
          }
        }
      ],
      currency: 'EUR'
    };
    const { data } = await axios.post('/search/freetext?campaign-value=JUNE', body, {
      headers: {
        'Accept-Language': locale
      }
    });
    return data;
  } catch (error) {
    if (!isSSR) throw error;
    return null;
  }
};

export const useAttractions = (locale: Locale, options: Options = {}) => {
  return useMutation({
    mutationKey: [queryKeys.attractions, locale],
    mutationFn: getAttractions,
    ...options
  });
};
