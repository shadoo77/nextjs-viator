'use client';

import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className=" bg-primary w-28 h-32">{t('test_title')}</h2>
    </div>
  );
}
