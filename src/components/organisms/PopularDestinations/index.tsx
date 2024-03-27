'use client';

import { useTranslation } from 'react-i18next';
import SectionWithTitle from '@/components/templates/SectionWithTitle';
import { popularDestinations } from '@/lib/constants';
import { Locale } from '@/i18nConfig';
import Link from '@/components/atoms/NextLink';
import { useDestination } from '@/tanstack/queries/destinations';

export default function TopDestinations({ locale }: { locale: Locale }) {
  const { t } = useTranslation();
  const { data: destinations, error } = useDestination();

  console.log({ error, destinations });

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
