'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useMediaQuery } from 'usehooks-ts';
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn, getPaginationButtons } from '@/lib/utils';
import { usePagination } from '@/hooks/usePagination';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const { activePage } = usePagination();
  const isLargeDevices = useMediaQuery('(min-width: 640px)');

  if (!totalPages || totalPages === 1) {
    return null;
  }

  const pages = getPaginationButtons(activePage, totalPages, isLargeDevices);

  return (
    <nav role="navigation" aria-label="Pagination Navigation">
      <ul className="flex list-none items-center justify-center text-sm text-slate-700 md:gap-1">
        {((!isLargeDevices && activePage !== 1) || isLargeDevices) && (
          <>
            <li>
              <Link
                href={pathname}
                aria-label="Goto Page 1"
                aria-disabled={activePage === 1}
                tabIndex={activePage === 1 ? -1 : 0}
                className={cn(
                  'inline-flex h-10 items-center justify-center gap-4 rounded stroke-slate-700 px-4 text-sm font-medium text-slate-700 transition duration-300 hover:bg-primary/10 hover:stroke-primary hover:text-primary focus:bg-primary/90 focus:stroke-primary focus:text-white focus-visible:outline-none',
                  {
                    'stroke-slate-400 text-slate-400 pointer-events-none': activePage === 1
                  }
                )}
              >
                <span className="sr-only">First</span>
                <ChevronsLeft className="-mx-1 h-4 w-4" />
              </Link>
            </li>
            <li>
              <Link
                href={`${pathname}?page=${activePage - 1}`}
                aria-label="Goto Page 1"
                className={cn(
                  'inline-flex h-10 items-center justify-center gap-4 rounded stroke-slate-700 px-4 text-sm font-medium text-slate-700 transition duration-300 hover:bg-primary/10 hover:stroke-primary hover:text-primary focus:bg-primary/90 focus:stroke-primary focus:text-white focus-visible:outline-none',
                  {
                    'stroke-slate-400 text-slate-400 pointer-events-none': activePage === 1
                  }
                )}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="-mx-1 h-4 w-4" />
              </Link>
            </li>
          </>
        )}
        {pages.map((page, idx) => {
          if (totalPages > 6 && page === '...') {
            return (
              <li key={idx}>
                <span className="pointer-events-none inline-flex h-10 items-center justify-center rounded px-4 text-sm font-medium text-slate-700 focus-visible:outline-none">
                  {page}
                </span>
              </li>
            );
          }
          return (
            <li key={idx}>
              <Link
                href={`${pathname}?page=${page}`}
                aria-label={`Goto Page ${page}`}
                className={cn(
                  'inline-flex h-10 items-center justify-center gap-4 rounded stroke-slate-700 px-4 text-sm font-medium text-slate-700 transition duration-300 hover:bg-primary/10 hover:stroke-primary hover:text-primary focus:bg-primary/90 focus:stroke-primary focus:text-white focus-visible:outline-none',
                  {
                    'whitespace-nowrap bg-primary text-white hover:bg-primary hover:text-white ring-offset-2':
                      activePage === page
                  }
                )}
              >
                {page}
              </Link>
            </li>
          );
        })}
        {((!isLargeDevices && activePage !== totalPages) || isLargeDevices) && (
          <>
            <li>
              <Link
                href={`${pathname}?page=${activePage + 1}`}
                aria-label="Goto Page 2"
                className={cn(
                  'inline-flex h-10 items-center justify-center gap-4 rounded stroke-slate-700 px-4 text-sm font-medium text-slate-700 transition duration-300 hover:bg-primary/10 hover:stroke-primary hover:text-primary focus:bg-primary/90 focus:stroke-primary focus:text-white focus-visible:outline-none',
                  {
                    'stroke-slate-400 text-slate-400 pointer-events-none': activePage === totalPages
                  }
                )}
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="-mx-1 h-4 w-4" />
              </Link>
            </li>
            <li>
              <Link
                href={`${pathname}?page=${totalPages}`}
                aria-label="Goto Page 99"
                className={cn(
                  'inline-flex h-10 items-center justify-center gap-4 rounded stroke-slate-700 px-4 text-sm font-medium text-slate-700 transition duration-300 hover:bg-primary/10 hover:stroke-primary hover:text-primary focus:bg-primary/90 focus:stroke-primary focus:text-white focus-visible:outline-none',
                  {
                    'stroke-slate-400 text-slate-400 pointer-events-none': activePage === totalPages
                  }
                )}
              >
                <span className="sr-only">Last</span>
                <ChevronsRight className="-mx-1 h-4 w-4" />
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
