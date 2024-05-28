'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { LuSearch, LuLoader2 } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import z from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMediaQuery } from 'usehooks-ts';
import { useEffect } from 'react';
import { SearchBox } from '@/components/organisms/SearchBox';
import { DatePicker } from '@/components/organisms/DatePicker';
import { Button } from '@/components/ui/button';
import { SearchResultsList } from '@/components/organisms/SearchResultsList';
import { cn } from '@/lib/utils';
import { useClient } from '@/hooks/useClient';
import { useUserPreferences } from '@/store/userPreferences';
import { useQueryParams } from '@/hooks/useQueryParams';
import { Destination } from '@/types/destinations';
import { useAbstractPath } from '@/hooks/useAbstractPath';

export default function SearchForm({ destination }: { destination?: Destination }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { abstractPath, isHomePage } = useAbstractPath();
  const searchParams = useSearchParams();
  const term = searchParams.get('term');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const matchMinWidthSM = useMediaQuery('(min-width: 640px)');
  const isLoading = false;
  const isClient = useClient();
  const formSchema = z.object({
    searchTerm: z
      .string()
      .trim()
      .min(1, {
        message: t('search.requiredError')
      }),
    date: z.object({
      from: z.date().optional(),
      to: z.date().optional()
    }),
    openSearch: z.boolean(),
    openDialogSearchBox: z.boolean().optional(),
    openDialogDatePicker: z.boolean().optional()
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

  const searchTerm: string = methods.getValues('searchTerm');

  const {
    storedSearchTerm,
    selectedDestination,
    selectedProductCode,
    resetUserPreferences,
    productFiltering,
    setSelectedDestination,
    setSearchTerm
  } = useUserPreferences((state) => ({
    storedSearchTerm: state.searchTerm,
    selectedDestination: state.selectedDestination,
    selectedProductCode: state.selectedProductCode,
    resetUserPreferences: state.reset,
    productFiltering: state.productFiltering,
    setSelectedDestination: state.setSelectedDestination,
    setSearchTerm: state.setSearchTerm
  }));

  const setValue = methods.setValue;

  // Reset user preferences on component mount
  useEffect(() => {
    resetUserPreferences();
    if (
      destination &&
      (abstractPath.startsWith('/searchResults') || abstractPath.startsWith('/tours'))
    ) {
      const queryTerm =
        abstractPath.startsWith('/searchResults') && term ? term : destination.destinationName;
      setSearchTerm(queryTerm);
      setValue('searchTerm', queryTerm);
      setSelectedDestination(destination);
      (startDate || endDate) &&
        setValue('date', {
          from: startDate ? new Date(startDate) : undefined,
          to: endDate ? new Date(endDate) : undefined
        });
    }
  }, [
    destination,
    endDate,
    abstractPath,
    resetUserPreferences,
    setSearchTerm,
    setSelectedDestination,
    setValue,
    startDate,
    term
  ]);

  const { queryString } = useQueryParams({
    startDate: productFiltering?.dateRange?.from,
    endDate: productFiltering?.dateRange?.to
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    let url = '';
    if (selectedDestination && selectedProductCode) {
      url = `/tours/${selectedDestination.destinationUrlName}/did-${selectedDestination.destinationId}/tid-${selectedProductCode}?${queryString}`;
    } else if (selectedDestination && !selectedProductCode) {
      url = `/tours/${selectedDestination.destinationUrlName}/did-${selectedDestination.destinationId}?${queryString}`;
    } else if (
      (storedSearchTerm.trim() || searchTerm.trim()) &&
      !selectedDestination &&
      !selectedProductCode
    ) {
      url = `/searchResults?term=${storedSearchTerm || searchTerm}&${queryString}`;
    }
    router.push(url);
  };

  const openSearch = methods.watch('openSearch');

  return (
    <FormProvider {...methods}>
      <form
        className={cn('relative flex w-full flex-col gap-2 rounded-2xl bg-white p-4 sm:flex-row', {
          'mx-auto bg-primary p-3 md:max-w-screen-lg md:p-4': !isHomePage
        })}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="relative flex flex-grow flex-col gap-2 sm:flex-row">
          <SearchBox />
          <DatePicker />
          {/* Search results list */}
          {matchMinWidthSM && isClient && (
            <div
              className={cn(
                'absolute top-full z-20 mt-2 w-full rounded bg-white text-start shadow-lg shadow-slate-500/10 drop-shadow-lg',
                'basis-0 transition-all duration-300 ease-in-out',
                openSearch ? 'visible opacity-100' : 'invisible opacity-0'
              )}
            >
              <SearchResultsList />
            </div>
          )}
        </div>
        {isHomePage && (
          <Button type="submit" disabled={isLoading} className="font-bold">
            {isLoading ? (
              <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LuSearch className="mr-2 h-4 w-4" />
            )}
            {t('search.submit')}
          </Button>
        )}
      </form>
    </FormProvider>
  );
}
