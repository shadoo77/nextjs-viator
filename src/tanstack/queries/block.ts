import { QueryKey, useQuery } from '@tanstack/react-query';
import contentfulAxios from '@/axios/cms';
import { queryKeys } from '@/tanstack/queryKeys';
import { Block, BlockType } from '@/types/block';
import { Locale } from '@/i18nConfig';
import { useLocale } from '@/hooks/useLocale';

type Props = {
  blockType: BlockType;
};

export const getBlock = async ({ queryKey }: { queryKey: QueryKey }) => {
  const locale = queryKey[1] as Locale;
  const blockType = queryKey[2] as BlockType;

  const { data } = await contentfulAxios.get<Block>('/entries', {
    params: {
      locale,
      content_type: 'blockModel',
      include: 10,
      'fields.type': blockType
    }
  });
  return data;
};

export const useBlock = ({ blockType }: Props) => {
  const { locale } = useLocale();

  return useQuery({
    queryKey: [queryKeys.block, locale, blockType],
    queryFn: getBlock,
    refetchOnWindowFocus: false
  });
};
