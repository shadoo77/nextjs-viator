'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import SectionWithTitle from '@/components/templates/SectionWithTitle';
import { populaireDestinations } from '@/lib/constants';

export default function TopDestinations() {
  const { t } = useTranslation();

  return (
    <SectionWithTitle title={t('homePage.popularDestinationSection.title')}>
      <div className="grid gap-6 grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
        {populaireDestinations.slice(0, 12).map(({ translationKey, imageUrl }, index) => (
          <div className="col-span-2 lg:col-span-2" key={index}>
            <Link
              href="/"
              style={{ backgroundImage: `url('${imageUrl}')` }}
              className="relative w-full h-32 rounded-md flex items-center justify-center font-extrabold transition-all duration-300 hover:scale-110 group bg-cover bg-center"
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
