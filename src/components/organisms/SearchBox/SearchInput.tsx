'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'usehooks-ts';
import { LuX } from 'react-icons/lu';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useUserPreferences } from '@/store/userPreferences';

export function SearchInput() {
  const { t } = useTranslation();
  const { formState, control, setValue, watch } = useFormContext();
  const storedSearchTerm = useUserPreferences((state) => state.searchTerm);
  const resetUserPreferences = useUserPreferences((state) => state.reset);

  const matchMinWidthSM = useMediaQuery('(min-width: 640px)');
  const searchTerm: string = watch('searchTerm');
  const errors = formState.errors;

  return (
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
                autoComplete="off"
                onFocus={() => {
                  if (!storedSearchTerm) {
                    setValue('openSearch', matchMinWidthSM);
                    setValue('openDialogSearchBox', !matchMinWidthSM);
                  }
                }}
                className={cn('pr-6', { 'w-full border-destructive': errors.searchTerm })}
                {...field}
                onBlur={() => setValue('openSearch', false)}
              />

              {searchTerm.trim().length > 0 && (
                <span
                  onClick={() => {
                    resetUserPreferences();
                    setValue('searchTerm', '');
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 hover:bg-muted"
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
  );
}
