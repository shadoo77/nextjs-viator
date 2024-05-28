import { useTranslation } from 'react-i18next';
import { useQueryParams } from '@/hooks/useQueryParams';
import { Filtering } from '@/types/productSearchFilters';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { durationOptions } from '@/lib/constants';

type DurationOption = (typeof durationOptions)[number];

export default function DurationFilter({
  durationInMinutes
}: {
  durationInMinutes?: Filtering['durationInMinutes'];
}) {
  const { t } = useTranslation();
  const { updatedPath } = useQueryParams();

  const getDefaultValue = () => {
    if (!durationInMinutes) return '';
    const from = durationInMinutes.from ? Number(durationInMinutes.from) : undefined;
    const to = durationInMinutes.to ? Number(durationInMinutes.to) : undefined;
    const item = durationOptions.find((dur) => dur.from === from && dur.to === to);
    if (!item) return '';
    return item.label;
  };

  const handleChange = (value: DurationOption['label']) => {
    const { from, to } = durationOptions.find((dur) => dur.label === value)!;
    updatedPath({ updatedQuery: { durationInMinutes: { from, to } } });
  };

  return (
    <section className="py-4">
      <div className="flex justify-between">
        <h2 className="mb-2 text-xl font-bold">{t('filters.duration')}</h2>
        <Button
          className="text-primary-500 hover:underline"
          variant="link"
          onClick={() => updatedPath({ updatedQuery: { durationInMinutes: undefined } })}
        >
          {t('clear')}
        </Button>
      </div>
      <RadioGroup
        defaultValue={getDefaultValue()}
        value={getDefaultValue()}
        onValueChange={handleChange}
      >
        {durationOptions.map(({ label }) => (
          <div className="flex items-center space-x-2 text-slate-500" key={label}>
            <RadioGroupItem value={label} id={label} />
            <Label htmlFor={label}>{t(`duration.${label}`)}</Label>
          </div>
        ))}
      </RadioGroup>
    </section>
  );
}
