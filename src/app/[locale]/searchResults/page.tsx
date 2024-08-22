import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { SearchResults } from './SearchResults';
import { Locale } from '@/i18nConfig';
import initTranslations from '@/i18n';
import getQueryClient from '@/tanstack/queryClient';
import { queryKeys } from '@/tanstack/queryKeys';
import { getDestinations } from '@/tanstack/queries/destinations';
import { getTags } from '@/tanstack/queries/tags';

type Props = {
  params: { locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params: { locale },
  searchParams: { term }
}: Props): Promise<Metadata> {
  const { t } = await initTranslations(locale);

  const metadata: Metadata = {
    title: t('searchResultsPage.seoTitle', { term }),
    description: t('searchResultsPage.seoDescription', { term })
  };

  return metadata;
}

export default async function SearchResultsPage({
  params: { locale },
  searchParams: { term }
}: Props) {
  const queryClient = getQueryClient();

  if (!term?.length) {
    notFound();
  }

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.destinations, locale],
    queryFn: getDestinations
  });
  // prefetch all tags
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.tags],
    queryFn: getTags
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchResults searchTerm={term as string} />
    </HydrationBoundary>
  );
}
