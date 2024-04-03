import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import axios from '@/axios/cms';
import { queryKeys } from '@/tanstack/queryKeys';
import { Block, BlockType } from '@/types/block';
import { Locale } from '@/i18nConfig';

type Props = {
  locale: Locale;
  blockType: BlockType;
};

export const getBlock = async ({ queryKey }: { queryKey: unknown[] }) => {
  const locale = queryKey[1] as Locale;
  const blockType = queryKey[2] as BlockType;

  const { data } = await axios.get<Block>('/entries', {
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
  const { locale } = useParams();

  return useQuery({
    queryKey: [queryKeys.block, locale, blockType],
    queryFn: getBlock,
    refetchOnWindowFocus: false
  });
};
