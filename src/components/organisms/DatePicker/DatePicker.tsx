'use client';

import { HTMLAttributes, useState, useEffect } from 'react';
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
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import 'dayjs/locale/nl';
import { fallbackLng } from '@/i18nConfig';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { PickerFooter } from '@/components/organisms/DatePicker/PickerFooter';
import {
  defaultClassNames,
  smallDevicesClassNames
} from '@/components/organisms/DatePicker/classNames';
import { useUserPreferences } from '@/store/userPreferences';

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

  const { formState, control, setValue, clearErrors, watch } = useFormContext();
  const openDialogDatePicker = watch('openDialogDatePicker');
  const invalid = formState.errors?.date;
  const setProductFiltering = useUserPreferences((state) => state.setProductFiltering);

  const [date, setDate] = useState<DateRange | undefined>(initialDate);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setValue('date', date);
    clearErrors('date');
    if (!date) return;
    setProductFiltering({
      dateRange: !date?.from
        ? undefined
        : {
            from: dayjs(date.from).format('YYYY-MM-DD'),
            to: date.to ? dayjs(date.to).format('YYYY-MM-DD') : ''
          }
    });
  }, [date, setValue, clearErrors, setProductFiltering]);

  useEffect(() => {
    if (matchMinSM) {
      setValue('openDialogDatePicker', false);
    }
  }, [matchMinSM, setValue]);

  return (
    <>
      <div className={cn('grid basis-1 gap-2 sm:basis-1/2', className)}>
        <FormField
          control={control}
          name="date"
          render={() => (
            <FormItem>
              <FormControl>
                <Popover onOpenChange={setOpen} open={open && matchMinSM}>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={'outline'}
                      className={cn('w-full justify-start text-left font-normal', {
                        'text-muted-foreground': !date,
                        'border-destructive': invalid,
                        'text-destructive': invalid
                      })}
                      onClick={() => {
                        if (matchMinSM) {
                          setOpen(true);
                        } else {
                          setValue('openDialogDatePicker', true);
                        }
                      }}
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
                      classNames={defaultClassNames}
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
      <Dialog
        open={openDialogDatePicker}
        onOpenChange={() => setValue('openDialogDatePicker', !openDialogDatePicker)}
      >
        <DialogContent className="z-top-navbar flex h-full w-screen max-w-screen-sm flex-col">
          <DialogHeader>
            <DialogTitle>{t('datePicker.pickDate')}</DialogTitle>
          </DialogHeader>
          <div className="flex-grow">
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
              classNames={smallDevicesClassNames(date)}
            />
            <PickerFooter
              date={date}
              done={() => {
                setOpen(false);
                setValue('openDialogDatePicker', false);
              }}
              reset={() => setDate(initialDate)}
              isSmallDevice={!matchMinSM}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
