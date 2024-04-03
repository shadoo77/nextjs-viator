'use client';

import { LuSearch, LuLoader2 } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import z from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchBox } from '@/components/organisms/SearchBox';
import { DatePicker } from '@/components/organisms/DatePicker';
import { Button } from '@/components/ui/button';
import SearchResultsList from '@/components/organisms/SearchResultsList';
import { cn } from '@/lib/utils';

export default function SearchForm() {
  const { t } = useTranslation();
  const isLoading = false;

  const formSchema = z.object({
    searchTerm: z
      .string()
      .trim()
      .min(1, {
        message: t('search.requiredError')
      }),
    date: z
      .object({
        from: z.date().optional(),
        to: z.date().optional()
      })
      .refine((data) => data.from || data.to, {
        message: t('datePicker.required')
      }),
    openSearch: z.boolean()
  });

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchTerm: '',
      date: {
        from: undefined,
        to: undefined
      },
      openSearch: false
    }
  });

  const validateDate = () => {
    const formValues = methods.getValues();
    if (!formValues.date.from && !formValues.date.to) {
      methods.setError('date', {
        message: 'Please select a date'
      });
      return false;
    }
    return true;
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('onSubmit >>>> ', values);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!validateDate()) {
      return;
    }
  };

  const openSearch = methods.watch('openSearch');

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full sm:flex-row relative"
      >
        <div className="flex-grow flex flex-col gap-2 sm:flex-row relative">
          <SearchBox />
          <DatePicker />
          {/* Search results list */}
          <div
            className={cn(
              'absolute z-20 py-2 mt-2 bg-white rounded shadow-lg drop-shadow-lg shadow-slate-500/10 w-full top-full text-start',
              'transition-all duration-300 ease-in-out basis-0',
              openSearch ? 'visible opacity-100' : 'invisible opacity-0'
            )}
          >
            <SearchResultsList />
          </div>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="font-bold"
          onClick={() => validateDate()}
        >
          {isLoading ? (
            <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LuSearch className="mr-2 h-4 w-4" />
          )}
          {t('search.submit')}
        </Button>
      </form>
    </FormProvider>
  );
}
