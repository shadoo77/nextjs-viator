'use client';

import { useTranslation } from 'react-i18next';
import SearchForm from '@/components/organisms/SearchForm';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="md:min-h-[calc(100vh-var(--navbar-height)-1px)] h-[1000px] flex flex-col justify-between">
      <section
        className="bg-hero-header-sm md:bg-hero-header h-96 max-h-96 md:h-[600px] md:max-h-[600px] w-full flex-1 flex items-center
      justify-center bg-no-repeat bg-center bg-cover relative p-2"
      >
        {/* overlay */}
        <div className="absolute inset-0 z-[1] bg-black opacity-50" />
        {/* content */}
        <div className="z-[2] flex flex-col gap-4 items-center text-center p-4 pt-20 md:pt-40">
          <div className="sm:max-w-lg md:max-w-2xl">
            <h1 className="text-xl md:text-3xl font-bold text-white">{t('homePage.hero.title')}</h1>
            <p className="text-slate-300">{t('homePage.hero.description')}</p>
          </div>
          <SearchForm />
        </div>
      </section>
    </div>
  );
}
