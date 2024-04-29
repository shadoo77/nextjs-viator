'use client';

import { DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type PickerFooterProps = {
  date: DateRange | undefined;
  isSmallDevice?: boolean;
  done: () => void;
  reset: () => void;
};

export function PickerFooter({ date, isSmallDevice, done, reset }: PickerFooterProps) {
  const { t } = useTranslation();
  return (
    <section className="px-4 pb-2">
      <Separator className="my-4" />
      <div className="flex justify-between pb-2">
        {!date?.from && !date?.to && !isSmallDevice && (
          <p className="w-full text-center">{t('datePicker.pickDate')}</p>
        )}
        {(date?.from || date?.to) && (
          <>
            <Button
              onClick={() => reset()}
              className={cn(buttonVariants({ variant: 'customOutline' }), 'font-semibold')}
            >
              {t('datePicker.reset')}
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                done();
              }}
              className="font-semibold"
            >
              {t('datePicker.done')}
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
