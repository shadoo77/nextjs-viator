import { useTranslation } from 'react-i18next';
import { useQueryParams } from '@/hooks/useQueryParams';
import { Filtering } from '@/types/productSearchFilters';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import RatingReview from '@/components/atoms/RatingReview';
import { ratingOptions } from '@/lib/constants';

export default function RatingFilter({ rating }: { rating?: Filtering['rating'] }) {
  const { t } = useTranslation();
  const { updatedPath } = useQueryParams();

  return (
    <section className="py-4">
      <div className="flex justify-between">
        <h2 className="mb-2 text-xl font-bold">{t('filters.rating')}</h2>
        <Button
          className="text-primary-500 hover:underline"
          variant="link"
          onClick={() => updatedPath({ updatedQuery: { rating: undefined } })}
        >
          {t('clear')}
        </Button>
      </div>
      <RadioGroup
        defaultValue={rating?.from?.toString() || ''}
        value={rating?.from?.toString() || ''}
        onValueChange={(value) => updatedPath({ updatedQuery: { rating: { from: value } } })}
      >
        {ratingOptions.map((r) => (
          <div className="flex items-center space-x-2" key={r}>
            <RadioGroupItem value={r} id={r} />
            <Label htmlFor={r} className="flex items-center gap-2 text-slate-500">
              <RatingReview averageRating={r} />
              {r === '5' ? '' : '& up'}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </section>
  );
}
