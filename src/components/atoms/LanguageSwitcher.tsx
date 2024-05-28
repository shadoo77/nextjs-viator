'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import qs from 'qs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import i18nConfig, { locales } from '@/i18nConfig';
import { setCookie } from '@/lib/cookies';
import { getQueryParams } from '@/lib/utils';

export default function LanguageChanger() {
  const { i18n, t } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = qs.parse(searchParams.toString(), { allowEmptyArrays: false });
  const queryString = getQueryParams(params);
  const currentPathname = queryString ? `${pathname}${queryString}` : pathname;

  const handleChange = (newLocale: string) => {
    // set cookie for next-i18n-router
    setCookie({ cname: 'NEXT_LOCALE', value: newLocale, days: 30 });
    // redirect to the new locale path
    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
    }

    router.refresh();
  };

  return (
    <Select onValueChange={handleChange} defaultValue={currentLocale}>
      <SelectTrigger className="w-[150px]">
        <SelectValue
          placeholder="Select a language"
          className="flex flex-row flex-nowrap justify-between gap-2"
        />
      </SelectTrigger>
      <SelectContent className=" z-top-navbar">
        {locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            <div className="flex flex-row flex-nowrap justify-between gap-2">
              <img
                loading="lazy"
                src={`https://flagcdn.com/${locale === 'en' ? 'us' : locale}.svg`}
                width="20"
                alt={t(`locales.${locale}`)}
              />
              <span>{t(`locales.${locale}`)}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
