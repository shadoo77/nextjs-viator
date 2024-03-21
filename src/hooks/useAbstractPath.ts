'use client';

import { useParams, usePathname } from 'next/navigation';

export function useAbstractPath(): string {
  const pathname = usePathname();
  const { locale } = useParams();
  return pathname.replace(`/${locale}`, '');
}
