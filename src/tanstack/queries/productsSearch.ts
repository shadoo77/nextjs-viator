import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import axios from '@/axios';
import { queryKeys } from '@/tanstack/queryKeys';
import { Locale } from '@/i18nConfig';
import { ProductSearchFilters } from '@/types/productSearchFilters';
import type { ProductSearchResults } from '@/types/products';
import { useLocale } from '@/hooks/useLocale';

type MutationFunctionProps = {
  locale: Locale;
  searchFilters: ProductSearchFilters;
  params?: Record<string, unknown>;
};

type Options = UseMutationOptions<ProductSearchResults, Error, MutationFunctionProps, unknown[]>;

export const searchProducts = async ({ locale, searchFilters, params }: MutationFunctionProps) => {
  const { data } = await axios.post<ProductSearchResults>('/products/search', searchFilters, {
    params,
    headers: {
      'Accept-Language': locale
    }
  });
  return data;
};

export const useProductsSearch = ({
  searchFilters,
  options = {},
  params = {}
}: {
  searchFilters: ProductSearchFilters;
  options?: Options;
  params?: Record<string, unknown>;
}) => {
  const { locale } = useLocale();

  return useMutation({
    mutationKey: [queryKeys.productsSearch, locale, searchFilters, params],
    mutationFn: searchProducts,
    ...options
  });
};
