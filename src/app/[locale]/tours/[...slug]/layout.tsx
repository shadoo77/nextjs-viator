import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Locale } from '@/i18nConfig';

type Props = {
  children: ReactNode;
  params: { locale: Locale; slug: string[] };
};

export default async function ToursLayout({ children, params: { slug } }: Props) {
  if (slug.length > 3 || slug.length < 2) {
    notFound();
  }

  const destinationId = slug[1].replace('did-', '').trim();
  if (!destinationId) {
    notFound();
  }

  if (slug.length === 3) {
    const productCode = slug[2].replace('tid-', '').trim();
    if (!productCode) {
      notFound();
    }
  }

  return <>{children}</>;
}
