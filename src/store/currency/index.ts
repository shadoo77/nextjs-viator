'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Currency } from '@/types/search';
import { appStorage } from '@/lib/constants';

interface CurrencyStore {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const initialState: { currency: Currency } = {
  currency: 'EUR'
};

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      ...initialState,
      setCurrency: (currency: Currency) => set({ currency })
    }),
    {
      name: appStorage.currency,
      storage: createJSONStorage(() => localStorage)
    }
  )
);
