'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function SearchBox() {
  const { t } = useTranslation();
  const { formState, control } = useFormContext();

  const errors = formState.errors;

  return (
    <div className="space-y-8 basis-1 md:basis-1/2">
      <FormField
        control={control}
        name="searchTerm"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                id="search-places"
                type="search"
                placeholder={t('search.placeholder')}
                className={cn('', { 'border-destructive': errors.searchTerm })}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
