'use client';

import { useParams, usePathname } from 'next/navigation';

export function useAbstractPath() {
  const pathname = usePathname();
  const { locale } = useParams();
  const abstractPath = pathname.replace(`/${locale}`, '') || '/';
  return { abstractPath, isHomePage: abstractPath === '/' };
}
