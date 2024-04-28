import { useQuery } from '@tanstack/react-query';
import axios from '@/axios';
import { queryKeys } from '@/tanstack/queryKeys';
import { Locale } from '@/i18nConfig';
import { ProductDetails } from '@/types/productDetails';
import { useLocale } from '@/hooks/useLocale';

export const getProduct = async ({ queryKey }: { queryKey: unknown[] }) => {
  const locale = queryKey[1] as Locale;
  const productCode = queryKey[2] as string;

  const { data } = await axios.get<ProductDetails>(`/products/${productCode}`, {
    headers: {
      'Accept-Language': locale
    }
  });
  return data;
};

export const useProduct = ({ productCode }: { productCode: string }) => {
  const { locale } = useLocale();

  return useQuery({
    queryKey: [queryKeys.product, locale, productCode],
    queryFn: getProduct,
    refetchOnWindowFocus: false
  });
};
