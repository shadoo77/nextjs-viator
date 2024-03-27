'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { menuItems } from '@/components/organisms/TopNavbar/menuItems';
import { cn } from '@/lib/utils';
import { useAbstractPath } from '@/hooks/useAbstractPath';
import LanguageChanger from '@/components/atoms/LanguageSwitcher';

export default function MobileNav({ open }: { open: boolean }) {
  const { i18n } = useTranslation();
  const minWidthLarge = useMediaQuery('(min-width: 1024px)');

  const abstractPath = useAbstractPath();

  // this prevents the scroll if the back page is scrollable
  useEffect(() => {
    open && document.body.classList.add('overflow-hidden');
    minWidthLarge && document.body.classList.remove('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [open, minWidthLarge]);

  return (
    <aside
      id="small-device-menu"
      aria-label="Side navigation"
      className={cn(
        'fixed top-[calc(var(--navbar-height)+1px)] bottom-0 left-0 z-40 flex w-full md:w-72 flex-col md:border-r border-r-slate-200 bg-white transition-transform lg:-translate-x-full',
        open ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <nav aria-label="side navigation" className="flex-1 divide-y divide-slate-100 overflow-auto">
        <ul className="flex flex-1 flex-col gap-1 py-3">
          {menuItems.map(({ id, label, href, icon, type }) => (
            <li className={cn('px-3', type === 'button' && 'flex justify-center')} key={id}>
              {type === 'text' ? (
                <Link
                  href={href}
                  className={cn(
                    'flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 aria-[current=page]:bg-primary/10 aria-[current=page]:text-primary',
                    abstractPath === href || (!abstractPath && href === '/')
                      ? 'bg-primary/10 text-primary'
                      : ''
                  )}
                  locale={i18n.language}
                >
                  <div className="flex w-6 items-center self-center">{icon}</div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    {label}
                  </div>
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
        <div className="flex justify-center pt-4">
          <LanguageChanger />
        </div>
      </nav>
    </aside>
  );
}
