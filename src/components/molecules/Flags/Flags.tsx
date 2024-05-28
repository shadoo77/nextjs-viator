import { useTranslation } from 'react-i18next';
import { useQueryParams } from '@/hooks/useQueryParams';
import { Flag } from '@/types/productSearchFilters';
import { Checkbox } from '@/components/atoms/Checkbox';

const flags: Flag[] = [
  'NEW_ON_VIATOR',
  'VIATOR_EXCLUSIVE',
  'FREE_CANCELLATION',
  'SKIP_THE_LINE',
  'PRIVATE_TOUR',
  'SPECIAL_OFFER',
  'LIKELY_TO_SELL_OUT'
];

export default function Flags({ activeFlags = [] }: { activeFlags?: Flag[] }) {
  const { t } = useTranslation();
  const { updatedPath } = useQueryParams();

  const handleClickedFlag = (flag: Flag) => {
    const combinedFlags = activeFlags.includes(flag)
      ? activeFlags.filter((fl) => fl !== flag)
      : [...new Set([...activeFlags, flag])];

    updatedPath({ updatedQuery: { flags: combinedFlags } });
  };

  return (
    <section className="py-4">
      <h2 className="mb-2 text-xl font-bold">{t('filters.specials')}</h2>
      <div className="flex flex-col">
        {flags.map((flag) => {
          const isActive = activeFlags.includes(flag);

          return (
            <Checkbox
              key={flag}
              id={flag}
              label={t(`flags.${flag}`)}
              defaultChecked={isActive}
              onClick={() => handleClickedFlag(flag)}
            />
          );
        })}
      </div>
    </section>
  );
}
