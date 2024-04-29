'use client';

import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'usehooks-ts';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/organisms/SearchBox/SearchInput';
import { SearchResultsList } from '@/components/organisms/SearchResultsList';
import { cn } from '@/lib/utils';
import { useUserPreferences } from '@/store/userPreferences';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

export default function SearchBox() {
  const { t } = useTranslation();
  const { setValue, watch } = useFormContext();
  const matchMinWidthSM = useMediaQuery('(min-width: 640px)');
  const storedSearchTerm = useUserPreferences((state) => state.searchTerm);

  const open = watch('openDialogSearchBox');
  const searchTerm = watch('searchTerm');

  useEffect(() => {
    if (matchMinWidthSM) {
      setValue('openDialogSearchBox', false);
    }
  }, [matchMinWidthSM, setValue]);

  return (
    <>
      <div className="basis-1 space-y-8 sm:basis-1/2">{!open && <SearchInput />}</div>
      <Dialog open={open} onOpenChange={() => setValue('openDialogSearchBox', !open)}>
        <DialogContent className="z-top-navbar flex h-full w-screen max-w-screen-sm flex-col overflow-auto px-4 [&_li]:px-0 [&_ul]:p-0">
          <DialogHeader>
            <DialogTitle>{t('search.mobileSearchTitle')}</DialogTitle>
          </DialogHeader>
          <div className="flex-grow">
            <SearchInput />
            <div
              className={cn(
                'mt-2 transition-all duration-300 ease-in-out',
                !storedSearchTerm.trim() ? 'visible opacity-100' : 'invisible opacity-0'
              )}
            >
              <SearchResultsList />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setValue('openDialogSearchBox', false)}
              disabled={searchTerm.trim().length === 0}
              className="text-base font-bold"
            >
              {t('applyChanges')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
