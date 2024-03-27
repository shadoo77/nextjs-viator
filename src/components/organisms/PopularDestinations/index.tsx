'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import axios from '@/axios';
import SectionWithTitle from '@/components/templates/SectionWithTitle';
import { popularDestinations } from '@/lib/constants';
import { useAttractions } from '@/tanstack/queries/attractions';
import { Locale } from '@/i18nConfig';

export default function TopDestinations({ locale }: { locale: Locale }) {
  const { t } = useTranslation();
  // const { data, mutate, error } = useAttractions(locale);
  // console.log({ data, error });

  // useEffect(() => {
  //   mutate(locale);
  // }, [mutate, locale]);

  useEffect(() => {
    (async () => {
      try {
        const requestBody = {
          searchTerm: 'antalya',
          searchTypes: [
            {
              searchType: 'ATTRACTIONS',
              pagination: {
                start: 1,
                count: 10
              }
            }
          ],
          currency: 'EUR'
        };

        const { data } = await axios.post('/search/freetext?campaign-value=JUNE', requestBody, {
          headers: {
            'Accept-Language': locale
          }
        });
        console.log('============= data ============== >>>', data);
        return data;
      } catch (error) {
        console.log('============= error ============== >>>', error);
      }
    })();
  }, [locale]);

  return (
    <SectionWithTitle title={t('homePage.popularDestinationSection.title')}>
      <div className="grid gap-6 grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
        {popularDestinations.slice(0, 12).map(({ translationKey, imageUrl }, index) => (
          <div className="col-span-2 lg:col-span-2" key={index}>
            <Link
              href="/"
              style={{ backgroundImage: `url('${imageUrl}')` }}
              className="relative w-full h-32 rounded-md flex items-center justify-center font-extrabold transition-all duration-300 hover:scale-110 group bg-cover bg-center"
              locale={locale}
            >
              <div className="rounded-md inset-0 absolute z-[1] bg-black transition-all duration-300 opacity-40 group-hover:opacity-5" />
              <span className="text-primary-foreground z-10">{t(translationKey)}</span>
            </Link>
          </div>
        ))}
      </div>
    </SectionWithTitle>
  );
}
