'use client';

import { Locale } from '@/i18nConfig';
import { getCurrencySymbol } from '@/lib/utils';
import { Pricing } from '@/types/products';

export function usePricing({ pricing, locale }: { pricing: Pricing | undefined; locale: Locale }) {
  if (!pricing?.summary) return null;

  const { currency, summary } = pricing;

  const price = getCurrencySymbol({
    currency,
    locale,
    price: summary.fromPrice
  });

  const priceBeforeDiscount = getCurrencySymbol({
    currency,
    locale,
    price:
      summary?.fromPriceBeforeDiscount && summary?.fromPriceBeforeDiscount !== summary?.fromPrice
        ? summary?.fromPriceBeforeDiscount
        : undefined
  });

  const saving = getCurrencySymbol({
    currency,
    locale,
    price: summary?.fromPriceBeforeDiscount
      ? summary?.fromPriceBeforeDiscount - summary?.fromPrice
      : 0
  });

  return { price, priceBeforeDiscount, saving, fromPrice: summary.fromPrice };
}
