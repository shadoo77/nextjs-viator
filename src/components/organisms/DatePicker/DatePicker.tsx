'use client';

import { HTMLAttributes, useState, FC, useEffect } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';
import { useFormContext } from 'react-hook-form';
import { DateRange } from 'react-day-picker';
import { nl, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import 'dayjs/locale/nl';
import { fallbackLng } from '@/i18nConfig';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

type PickerFooterProps = {
  date: DateRange | undefined;
  done: () => void;
  reset: () => void;
};

const PickerFooter: FC<PickerFooterProps> = ({ date, done, reset }) => {
  const { t } = useTranslation();
  return (
    <section className="px-4 pb-2">
      <Separator className="my-4" />
      <div className="flex justify-between pb-2">
        {!date?.from && !date?.to && (
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
            <Button onClick={() => done()} className="font-semibold">
              {t('datePicker.done')}
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default function DatePicker({ className }: HTMLAttributes<HTMLDivElement>) {
  const { t, i18n } = useTranslation();

  const matchMinSM = useMediaQuery('(min-width: 640px)');

  dayjs.extend(dayOfYear);
  dayjs.extend(localeData);
  dayjs.extend(localizedFormat);
  dayjs().format('L LT');
  dayjs().locale(i18n.language === fallbackLng ? 'en-US' : 'nl-NL'); // set dayjs locale to match i18n language

  const from = dayjs().toDate();
  const to = dayjs().dayOfYear(365).toDate();

  const initialDate = {
    from: undefined,
    to: undefined
  };

  const { formState, control, setValue, clearErrors } = useFormContext();

  const invalid = formState.errors?.date;

  const [date, setDate] = useState<DateRange | undefined>(initialDate);

  useEffect(() => {
    setValue('date', date);
    clearErrors('date');
  }, [date, setValue, clearErrors]);

  const [open, setOpen] = useState(false);

  return (
    <div className={cn('grid gap-2 basis-1 sm:basis-1/2', className)}>
      <FormField
        control={control}
        name="date"
        render={() => (
          <FormItem>
            <FormControl>
              <Popover onOpenChange={setOpen} open={open}>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={'outline'}
                    className={cn('w-full justify-start text-left font-normal', {
                      'text-muted-foreground': !date,
                      'border-destructive': invalid,
                      'text-destructive': invalid
                    })}
                    onClick={() => setOpen(!open)}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {dayjs(date.from).format('ll')} - {dayjs(date.to).format('ll')}
                        </>
                      ) : (
                        dayjs(date.from).format('ll')
                      )
                    ) : (
                      <span>{t('datePicker.pickDate')}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    fromDate={from}
                    toDate={to}
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={matchMinSM ? 2 : 1}
                    locale={i18n.language === fallbackLng ? enUS : nl}
                    classNames={{
                      cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-[#ddd6fe] first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                      day_range_middle: 'aria-selected:bg-[#ddd6fe] aria-selected:text-slate-800'
                    }}
                  />
                  <PickerFooter
                    date={date}
                    done={() => setOpen(false)}
                    reset={() => setDate(initialDate)}
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
