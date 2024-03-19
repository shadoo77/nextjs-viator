'use client';

import { LuLoader2 } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

export const Loader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center h-16 gap-1 p-4">
      <LuLoader2 className="w-4 h-4 animate-spin" />
      <p className="font-medium leading-none tracking-tight ">{t('loading')}...</p>
    </div>
  );
};
