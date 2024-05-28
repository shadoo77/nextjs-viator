'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useParams } from 'next/navigation';
import { menuItems } from '@/components/organisms/TopNavbar/menuItems';
import MobileNav from '@/components/organisms/TopNavbar/MobileNav';
import { cn } from '@/lib/utils';
import { useAbstractPath } from '@/hooks/useAbstractPath';
import LanguageChanger from '@/components/atoms/LanguageSwitcher';
import { Locale } from '@/i18nConfig';
import Link from '@/components/atoms/NextLink';

export default function TopNavbar() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const { abstractPath } = useAbstractPath();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale } = useParams();

  // Close the mobile menu when the route changes
  useEffect(() => {
    setIsToggleOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <header className="border-b-1 sticky left-0 top-0 z-[51] w-full border-b border-slate-200 bg-white shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full">
          <nav
            aria-label="main navigation"
            className="container flex h-navbar-height items-stretch justify-between px-2 font-medium text-slate-700 md:px-3 lg:px-4"
            role="navigation"
          >
            {/*      <!-- Brand logo --> */}
            <Link
              id="WindUI"
              aria-label="WindUI logo"
              aria-current="page"
              className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none"
              href="/"
              locale={locale as Locale}
            >
              <img src="https://placehold.co/120X40" alt="logo" />
            </Link>
            {/*      <!-- Mobile trigger --> */}
            <button
              className={cn(
                'relative order-10 block h-10 w-10 self-center lg:hidden',
                isToggleOpen
                  ? 'visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 '
                  : ''
              )}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? 'true' : 'false'}
              aria-label="Toggle navigation"
              title="Side navigation"
              type="button"
              aria-haspopup="menu"
              aria-controls="small-device-menu"
            >
              <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>
            {/*      <!-- Navigation links --> */}
            <ul
              role="menubar"
              aria-label="Select page"
              className="relative top-0 hidden h-full w-auto overflow-visible px-0 py-0 font-medium transition-[opacity,visibility] duration-300 lg:flex lg:items-center lg:justify-center"
            >
              {menuItems.map(({ id, label, href, type }) => (
                <li role="none" className="mx-2 flex" key={id}>
                  {type === 'text' ? (
                    <Link
                      role="menuitem"
                      aria-haspopup="false"
                      className={cn(
                        'flex items-center px-4 transition-colors duration-300 hover:text-primary focus:text-primary focus:outline-none focus-visible:outline-none',
                        {
                          'text-primary': abstractPath === href
                        }
                      )}
                      href={href}
                      locale={locale as Locale}
                    >
                      <span>{label}</span>
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>

            <span className="hidden self-center lg:inline-block">
              <LanguageChanger />
            </span>
          </nav>
          <MobileNav open={isToggleOpen} />
        </div>
      </header>

      {/*  <!-- Backdrop --> */}
      <div
        className={`fixed bottom-0 left-0 right-0 top-0 z-10 bg-slate-900/20 transition-colors lg:hidden ${
          isToggleOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsToggleOpen(false)}
      />
    </>
  );
}
