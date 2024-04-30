import { useQuery } from '@tanstack/react-query';
import contentfulAxios from '@/axios/cms';
import { queryKeys } from '@/tanstack/queryKeys';
import { isSSR } from '@/lib/utils';
import { GlobalInfo } from '@/types/global';
import { Locale } from '@/i18nConfig';
import { useLocale } from '@/hooks/useLocale';

export const getGlobal = async ({ queryKey }: { queryKey: unknown[] }) => {
  try {
    const locale = queryKey[1] as Locale;

    const { data } = await contentfulAxios.get<GlobalInfo>('/entries', {
      params: {
        locale,
        content_type: 'globalSiteInfo',
        include: 10
      }
    });
    return data;
  } catch (error) {
    if (!isSSR) throw error;
    return undefined;
  }
};

export const useGlobal = () => {
  const { locale } = useLocale();

  return useQuery({
    queryKey: [queryKeys.global, locale],
    queryFn: getGlobal,
    refetchOnWindowFocus: false
  });
};
