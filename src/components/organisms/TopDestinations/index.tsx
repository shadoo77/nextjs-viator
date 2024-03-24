'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import SectionWithTitle from '@/components/templates/SectionWithTitle';
import { topDestinations } from '@/lib/constants';

export default function TopDestinations() {
  const { t } = useTranslation();

  return (
    <SectionWithTitle title={t('homePage.topDestinationSection.title')}>
      <div className="grid gap-6 grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
        {topDestinations.slice(0, 12).map(({ translationKey }, index) => (
          <div className="col-span-2 lg:col-span-2" key={index}>
            <Link
              href="/"
              className="relative w-full h-32 rounded-md bg-slate-300 flex items-center justify-center font-extrabold transition-all duration-300 hover:scale-110"
            >
              <div className="rounded-md inset-0 absolute z-[1] bg-black transition-all duration-300 opacity-40 hover:opacity-5" />
              {t(translationKey)}
            </Link>
          </div>
        ))}
      </div>
    </SectionWithTitle>
  );
}
