import { ReactNode } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale } from '@/i18nConfig';
import { getDestinations } from '@/tanstack/queries/destinations';
import { queryKeys } from '@/tanstack/queryKeys';
import initTranslations from '@/i18n';

type Props = {
  children: ReactNode;
  params: { locale: Locale; slug: string[] };
};

export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: Locale; slug: string[] };
}): Promise<Metadata> {
  const { t } = await initTranslations(locale);
  const metadata: Metadata = {
    title: 'Single Tour Page Title',
    description: 'Single Tour Page Description'
  };

  if (slug.length === 3) {
    // TODO: get seo data of product page (single tour page)
    return metadata;
  }

  try {
    const destinationId = slug[1].replace('did-', '');
    const res = await getDestinations({ queryKey: [queryKeys.destinations, locale] });
    const destination = res.data.find((d) => d.destinationId === Number(destinationId));
    metadata.title = `${destination?.destinationName} tours`;
    metadata.description = t('toursPage.seoDescription', {
      cityName: destination?.destinationName
    });
    return metadata;
  } catch (error) {
    return metadata;
  }
}

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
