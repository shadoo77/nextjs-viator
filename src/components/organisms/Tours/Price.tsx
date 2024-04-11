'use client';

import { useTranslation } from 'react-i18next';

type PricesProps = {
  price: string;
  priceBeforeDiscount: string;
  saving: string;
  fromPrice: number;
};

export default function Price({ prices }: { prices: PricesProps | null }) {
  const { t } = useTranslation();

  if (!prices?.fromPrice) return null;

  return (
    <div className="flex flex-col justify-center text-sm text-slate-400">
      <div className="flex flex-wrap gap-2">
        <span className="lowercase">{t('price.from')}</span>
        <span className="font-bold text-muted-foreground">{prices.price}</span>
        {prices.priceBeforeDiscount && (
          <>
            <span className="font-bold line-through text-black">{prices.priceBeforeDiscount}</span>
            <span className="font-normal text-destructive">
              {t('savings', { mount: prices.saving })}
            </span>
          </>
        )}
      </div>
      {prices.fromPrice >= 100 && <span className="w-full">{t('price.variesByGroupSize')}</span>}
    </div>
  );
}
