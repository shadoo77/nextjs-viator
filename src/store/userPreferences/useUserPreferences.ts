'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Currency, SearchFilter } from '@/types/search';
import { appStorage, currencyFallback } from '@/lib/constants';
import { Destination } from '@/types/destinations';
import { Product } from '@/types/products';
import { getCookie } from '@/lib/cookies';

interface UserPreferencesStore {
  searchTerm: SearchFilter['searchTerm'];
  searchTypes: SearchFilter['searchTypes'];
  productSorting?: SearchFilter['productSorting'];
  productFiltering?: SearchFilter['productFiltering'];
  currency: Currency;
  selectedDestination: Destination | null;
  selectedProductCode: Product['productCode'] | null;
  setSearchTerm: (searchTerm: string) => void;
  setProductSorting: (productSorting: SearchFilter['productSorting']) => void;
  setProductFiltering: (productFiltering: SearchFilter['productFiltering']) => void;
  setCurrency: (currency: Currency) => void;
  setSelectedDestination: (destination: Destination) => void;
  setSelectedProductCode: (productCode: Product['productCode']) => void;
  reset: () => void;
}

const initialState = {
  searchTerm: '',
  searchTypes: [
    {
      searchType: 'DESTINATIONS' as SearchFilter['searchTypes'][0]['searchType'],
      pagination: { start: 1, count: 10 }
    },
    {
      searchType: 'PRODUCTS' as SearchFilter['searchTypes'][1]['searchType'],
      pagination: { start: 1, count: 10 }
    }
  ],
  productSorting: undefined,
  productFiltering: undefined,
  currency: (getCookie(appStorage.currency) || currencyFallback) as Currency,
  selectedDestination: null,
  selectedProductCode: null
};

const useUserPreferences = create<UserPreferencesStore>()(
  persist(
    (set) => ({
      ...initialState,
      setSearchTerm: (searchTerm: string) => {
        set({ searchTerm });
      },
      setProductSorting: (productSorting: SearchFilter['productSorting']) =>
        set({ productSorting }),
      setProductFiltering: (productFiltering: SearchFilter['productFiltering']) =>
        set({
          productFiltering
        }),
      setCurrency: (currency: Currency) => set({ currency }),
      setSelectedDestination: (selectedDestination: Destination) => set({ selectedDestination }),
      setSelectedProductCode: (selectedProductCode: Product['productCode']) =>
        set({ selectedProductCode }),
      reset: () => set(initialState)
    }),
    {
      name: appStorage.currency,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ currency: state.currency })
    }
  )
);

export default useUserPreferences;
