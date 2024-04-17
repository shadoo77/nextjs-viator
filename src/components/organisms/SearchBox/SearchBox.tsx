'use client';

import { useFormContext } from 'react-hook-form';
import { LuX } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'usehooks-ts';
import { MobileSearchBox } from './MobileSearchBox';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function SearchBox() {
  const { t } = useTranslation();
  const { formState, control, setValue, watch } = useFormContext();
  const matchMinWidthSM = useMediaQuery('(min-width: 640px)');

  const searchTerm: string = watch('searchTerm');
  const errors = formState.errors;

  return (
    <>
      <div className="space-y-8 basis-1 sm:basis-1/2">
        <FormField
          control={control}
          name="searchTerm"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    id="search-places"
                    type="text"
                    placeholder={t('search.placeholder')}
                    onFocus={() => {
                      if (matchMinWidthSM) {
                        setValue('openSearch', true);
                      } else {
                        setValue('openDialogSearchBox', true);
                      }
                    }}
                    // onClick={() => {
                    //   !matchMinWidthSM && setValue('openDialogSearchBox', true);
                    // }}
                    className={cn('pr-6', { 'border-destructive w-full': errors.searchTerm })}
                    {...field}
                    onBlur={() => setValue('openSearch', false)}
                  />

                  {searchTerm.trim().length > 0 && (
                    <span
                      onClick={() => setValue('searchTerm', '')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer p-1 hover:bg-muted rounded-full"
                    >
                      <LuX className="h-4 w-4" />
                    </span>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <MobileSearchBox />
    </>
  );
}
