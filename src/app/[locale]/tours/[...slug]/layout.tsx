import { ReactNode } from 'react';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { Locale } from '@/i18nConfig';
import DestinationInitializer from '@/store/destination/DestinationInitializer';
import { getDestinations } from '@/tanstack/queries/destinations';
import { queryKeys } from '@/tanstack/queryKeys';
import { getLocationDetails } from '@/lib/utils';
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

  if (slug.length === 3) {
    // get seo data of product page (single tour page)
    return {
      title: 'Single Tour Page Title',
      description: 'Single Tour Page Description'
    } as Metadata;
  }

  const metadata: Metadata = {
    title: 'Tours Page Title',
    description: 'Tours Page Description'
  };

  try {
    const destinationId = slug[1].replace('did-', '');
    const res = await getDestinations({ queryKey: [queryKeys.destinations, locale] });
    const destination = res.data.find((d) => d.destinationId === Number(destinationId));
    metadata.title = `${destination?.destinationName} tours`;
    metadata.description = t('toursPage.seoDescription', {
      cityName: destination?.destinationName
    });
  } catch (error) {
    return metadata;
  }

  return metadata;
}

export default async function ToursLayout({ children, params: { locale, slug } }: Props) {
  if (slug.length > 3 || slug.length < 2) {
    notFound();
  }

  const destinationId = slug[1].replace('did-', '');

  if (!destinationId) {
    notFound();
  }

  let destination = null;
  let allDestinations = [];

  try {
    const res = await getDestinations({ queryKey: [queryKeys.destinations, locale] });

    if (!res || !res.data.length) {
      notFound();
    }
    allDestinations = res.data;
    destination = res.data.find((d) => d.destinationId === Number(destinationId));

    if (!destination) {
      notFound();
    }
  } catch (error) {
    notFound();
  }

  if (slug.length === 3) {
    const productCode = slug[2].replace('tid-', '');
    if (!productCode) {
      notFound();
    }
  }

  if (slug[0].toLowerCase() !== destination.destinationUrlName.toLowerCase()) {
    redirect(`/${locale}/tours/${destination.destinationUrlName}/${slug.slice(1).join('/')}`);
  }

  const {
    destinationId: destId,
    destinationUrlName,
    ...location
  } = getLocationDetails(allDestinations, destination.destinationId.toString());

  return (
    <DestinationInitializer destination={destination} location={location}>
      {children}
    </DestinationInitializer>
  );
}
