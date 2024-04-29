'use client';

import { useTranslation } from 'react-i18next';
import { SearchForm } from '@/components/organisms/SearchForm';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative flex h-96 max-h-96 w-full items-end justify-center bg-hero-header-sm bg-cover bg-center bg-no-repeat p-4 md:h-[600px] md:max-h-[600px] md:items-center md:bg-hero-header">
      {/* overlay */}
      <div className="absolute inset-0 h-full w-full bg-black opacity-50" />
      {/* content */}
      <div className="flex w-full flex-col items-center gap-4 text-center md:w-4/5 lg:w-4/6">
        <div className="z-[1] sm:max-w-lg md:max-w-2xl">
          <h1 className="text-xl font-bold text-white md:text-3xl">{t('homePage.hero.title')}</h1>
          <p className="text-slate-300">{t('homePage.hero.description')}</p>
        </div>
        <SearchForm />
      </div>
    </section>
  );
}
