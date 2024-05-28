import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryParams } from '@/hooks/useQueryParams';
import { Slider } from '@/components/ui/slider';
import { getCurrencySymbol } from '@/lib/utils';

export default function PriceFilter({ selectedHighestPrice }: { selectedHighestPrice?: number }) {
  const { t } = useTranslation();
  const { updatedPath } = useQueryParams();
  const maxPrice = 1000;
  const [desiredPrice, setDesiredPrice] = useState(maxPrice);

  useEffect(() => {
    setDesiredPrice(selectedHighestPrice || maxPrice);
  }, [selectedHighestPrice]);

  const handlePriceChange = (values: number[]) => {
    setDesiredPrice(values[0]);
    setTimeout(() => {
      updatedPath({ updatedQuery: { highestPrice: values[0] } });
    }, 500);
  };

  return (
    <section className="py-4">
      <h2 className="mb-2 text-xl font-bold">{t('filters.price')}</h2>
      <div className="flex flex-wrap justify-between">
        <Slider
          defaultValue={[maxPrice]}
          min={1}
          max={maxPrice}
          step={1}
          value={[desiredPrice]}
          minStepsBetweenThumbs={1}
          onValueChange={handlePriceChange}
          dir="ltr"
          className="mb-4 w-full basis-full"
        />
        <span className="text-center text-sm text-slate-500">
          {getCurrencySymbol({ currency: 'EUR', locale: 'en', price: 1 })}
        </span>
        <span className="text-center text-sm text-slate-500">
          {getCurrencySymbol({ currency: 'EUR', locale: 'en', price: desiredPrice })}
        </span>
      </div>
    </section>
  );
}
