'use client';

import { useParams } from 'next/navigation';
import type { Locale } from '@/i18nConfig';

export function useLocale() {
  const { locale }: { locale: Locale } = useParams();
  return { locale };
}
