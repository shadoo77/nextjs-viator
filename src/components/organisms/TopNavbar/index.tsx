'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { menuItems } from '@/components/organisms/TopNavbar/menuItems';
import MobileNav from '@/components/organisms/TopNavbar/MobileNav';
import { cn } from '@/lib/utils';
import { useAbstractPath } from '@/hooks/useAbstractPath';

export default function TopNavbar() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const abstractPath = useAbstractPath();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Close the mobile menu when the route changes
  useEffect(() => {
    setIsToggleOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <header className="sticky top-0 left-0 z-20 w-full bg-white border-b shadow-lg border-b-1 border-slate-200 shadow-slate-700/5 after:absolute after:top-full after:left-0 after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative max-w-full mx-auto">
          <nav
            aria-label="main navigation"
            className="container flex items-stretch justify-between px-2 font-medium md:px-3 lg:px-4 h-navbar-height text-slate-700"
            role="navigation"
          >
            {/*      <!-- Brand logo --> */}
            <Link
              id="WindUI"
              aria-label="WindUI logo"
              aria-current="page"
              className="flex items-center gap-2 py-3 text-lg whitespace-nowrap focus:outline-none"
              href="/"
            >
              <img src="https://placehold.co/120X40" alt="logo" />
            </Link>
            {/*      <!-- Mobile trigger --> */}
            <button
              className={cn(
                'relative order-10 block h-10 w-10 self-center lg:hidden',
                isToggleOpen
                  ? 'visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 '
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
              <div className="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
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
              className="relative hidden top-0 h-full w-auto overflow-visible px-0 py-0 font-medium transition-[opacity,visibility] duration-300 lg:flex lg:justify-center lg:items-center"
            >
              {menuItems.map(({ id, label, href, type }) => (
                <li role="none" className="flex mx-2" key={id}>
                  {type === 'text' ? (
                    <Link
                      role="menuitem"
                      aria-haspopup="false"
                      className={cn(
                        'flex items-center px-4 transition-colors duration-300 hover:text-primary focus:text-primary focus:outline-none focus-visible:outline-none',
                        abstractPath === href || (!abstractPath && href === '/')
                          ? 'text-primary'
                          : ''
                      )}
                      href={href}
                    >
                      <span>{label}</span>
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>
          <MobileNav open={isToggleOpen} />
        </div>
      </header>

      {/*  <!-- Backdrop --> */}
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 z-10 bg-slate-900/20 transition-colors lg:hidden ${
          isToggleOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsToggleOpen(false)}
      />
    </>
  );
}
