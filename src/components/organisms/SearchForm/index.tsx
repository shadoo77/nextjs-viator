'use client';

import { LuSearch, LuLoader2 } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import z from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchBox } from '@/components/organisms/SearchBox';
import { DatePicker } from '@/components/organisms/DatePicker';
import { Button } from '@/components/ui/button';

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
      })
  });

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchTerm: '',
      date: {
        from: undefined,
        to: undefined
      }
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

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 md:flex-row w-full"
      >
        <div className="flex-grow flex flex-col gap-2 md:flex-row">
          <SearchBox />
          <DatePicker />
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
