'use client';

import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDebounceValue } from 'usehooks-ts';
import { LuSearch, LuNavigation, LuMapPin, LuBaggageClaim } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import { closestLocation, textHighlighter } from '@/lib/utils';
import { useSearch } from '@/tanstack/queries/search';
import { SearchFilter } from '@/types/search';
import { useLocale } from '@/hooks/useLocale';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useDestinations } from '@/tanstack/queries/destinations';
import { ErrorAlert } from '@/components/molecules/ErrorAlert';
import { Loader } from '@/components/molecules/Loader';
import { useUserPreferences } from '@/store/userPreferences';
import { getSearchResultsList } from '@/components/organisms/SearchResultsList/helper';

export default function SearchResultsList() {
  const { locale } = useLocale();
  const { t } = useTranslation();
  const { setValue, getValues, clearErrors } = useFormContext();
  const searchTerm: string = getValues('searchTerm');

  const { location } = useGeolocation();
  const { data: destinationsResponse, error: destError } = useDestinations();
  const {
    currency,
    setSelectedDestination,
    setSelectedProductCode,
    setSeachTerm,
    storedSearchTerm
  } = useUserPreferences((state) => ({
    currency: state.currency,
    setSelectedProductCode: state.setSelectedProductCode,
    setSelectedDestination: state.setSelectedDestination,
    setSeachTerm: state.setSearchTerm,
    storedSearchTerm: state.searchTerm
  }));
  const [debouncedSearchTerm] = useDebounceValue(searchTerm, 500);

  const searchFilter: SearchFilter = useMemo(
    () => ({
      searchTerm: debouncedSearchTerm,
      searchTypes: [
        {
          searchType: 'DESTINATIONS',
          pagination: { start: 1, count: 10 }
        },
        {
          searchType: 'PRODUCTS',
          pagination: { start: 1, count: 10 }
        }
      ],
      currency
    }),
    [debouncedSearchTerm, currency]
  );

  const { data, isPending, error, mutate } = useSearch(searchFilter);

  useEffect(() => {
    if (!storedSearchTerm.trim() && debouncedSearchTerm?.trim() && searchTerm.trim()) {
      mutate({
        locale,
        searchFilter
      });
    }
  }, [debouncedSearchTerm, locale, mutate, searchFilter, searchTerm, storedSearchTerm]);

  if (destError instanceof Error || !destinationsResponse?.data?.length) {
    return (
      <div className="divide-y divide-slate-100 p-2">
        <ErrorAlert
          title={t('error.title')}
          description={t('error.description')}
          withTryAgainButton
        />
      </div>
    );
  }

  const items = getSearchResultsList(data, destinationsResponse.data);
  const nearestCity = location && closestLocation(location, destinationsResponse.data);

  return (
    <ul className="divide-y divide-slate-100 p-2">
      {error instanceof Error && (
        <ErrorAlert
          title={t('error.title')}
          description={t('error.description')}
          withTryAgainButton
          className="col-span-8 mx-auto"
        />
      )}
      {isPending && <Loader />}
      {items.map(({ title, subtitle, type, image, destination, productCode }, index) => (
        <li
          key={index}
          onClick={() => {
            setSelectedDestination(destination);
            if (type === 'PRODUCT' && productCode) {
              setSelectedProductCode(productCode);
            }
            setSeachTerm(title);
            setValue('searchTerm', title);
            setValue('openSearch', false);
          }}
          className="group flex cursor-pointer items-center gap-4 px-4 py-3 hover:bg-primary/10"
        >
          <div className="flex shrink-0 items-center self-center text-primary">
            {type === 'DESTINATION' ? (
              <LuMapPin className="h-6 w-6" />
            ) : image?.url ? (
              <img
                src={image.url}
                alt={image.caption}
                width={image.width}
                height={image.height}
                className="h-12 w-12 rounded object-cover"
              />
            ) : (
              <LuBaggageClaim className="h-6 w-6" />
            )}
          </div>
          <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0">
            <h4
              className="text-base text-slate-700 group-hover:text-primary"
              dangerouslySetInnerHTML={textHighlighter({ text: title, searchTerm })}
            />
            <p
              className="w-full text-sm text-slate-500 group-hover:text-primary/50"
              dangerouslySetInnerHTML={textHighlighter({
                text: subtitle,
                searchTerm
              })}
            />
          </div>
        </li>
      ))}
      {searchTerm.trim().length > 0 && (
        <li
          onClick={() => {
            setSeachTerm(searchTerm);
            setValue('openSearch', false);
          }}
          className="group flex cursor-pointer items-center gap-4 px-4 py-3 hover:bg-primary/10"
        >
          <span className="flex items-center text-primary">
            <LuSearch className="h-6 w-6" />
          </span>
          <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0">
            <h4
              className="text-base text-slate-700 group-hover:text-primary"
              dangerouslySetInnerHTML={textHighlighter({
                text: searchTerm,
                searchTerm,
                unHighlightedText: t('search.searchFor')
              })}
            />
          </div>
        </li>
      )}
      {nearestCity && !searchTerm.trim().length && (
        <li
          onClick={() => {
            setSelectedDestination(nearestCity);
            setValue('searchTerm', t('search.nearby'));
            setSeachTerm(t('search.nearby'));
            setValue('openSearch', false);
            clearErrors('searchTerm');
          }}
          className="group flex cursor-pointer items-center gap-4 px-4 py-3 hover:bg-primary/10"
        >
          <span className="flex items-center text-primary">
            <LuNavigation className="h-6 w-6" />
          </span>
          <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0">
            <h4 className="text-base text-slate-700 group-hover:text-primary">
              {t('search.nearby')}
            </h4>
          </div>
        </li>
      )}
    </ul>
  );
}
