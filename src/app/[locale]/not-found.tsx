'use client';

import { useTranslation } from 'react-i18next';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from '@/components/atoms/NextLink';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="container flex flex-col items-center text-destructive py-36 h-[calc(100vh-var(--navbar-height)-1px)]">
      <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
        {t('NotFoundPage.title')}
      </h1>
      <div className="mt-6 text-gray-400 md:text-lg">
        <p className="max-w-[460px]">{t('NotFoundPage.description')}</p>
      </div>
      <Link href="/" className={cn(buttonVariants({ variant: 'link' }), 'w-fit')}>
        {t('backHome')}
      </Link>
    </div>
  );
}
