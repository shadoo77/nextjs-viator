import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import AppLoader from './loading';
import i18nConfig, { Locale } from '@/i18nConfig';
import initTranslations from '@/i18n';
import '@/app/globals.css';
import Providers from '@/lib/Providers';
import TranslationsProvider from '@/lib/TranslationsProvider';
import { Toaster } from '@/components/ui/sonner';
import TopNavbar from '@/components/organisms/TopNavbar';
import ScrollToTop from '@/components/organisms/ScrollToTop';
import { getGlobal } from '@/tanstack/queries/global';
import { queryKeys } from '@/tanstack/queryKeys';

const inter = Inter({ subsets: ['latin'] });

interface Props {
  children: ReactNode;
  params: { locale: Locale };
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { t } = await initTranslations(locale);
  const data = await getGlobal({ queryKey: [queryKeys.global, locale] });

  const siteTitle = !data ? t('siteTitle') : data.items[0].fields.siteTitle;
  const description = !data ? t('siteDescription') : data.items[0].fields.siteDescription;

  const metadata: Metadata = {
    title: {
      template: `%s | ${siteTitle}`,
      absolute: siteTitle
    },
    description
  };

  return metadata;
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function Layout({ children, params: { locale } }: Props) {
  const { resources } = await initTranslations(locale);

  return (
    <html lang={locale}>
      <body className={inter.className} suppressHydrationWarning>
        <Suspense fallback={<AppLoader />}>
          <TranslationsProvider locale={locale} resources={resources}>
            <Providers>
              <TopNavbar />
              <ScrollToTop />
              <Toaster richColors />
              <main className="container bg-background min-h-[calc(100vh-var(--navbar-height)-1px)] flex flex-col">
                <section className="flex-1">{children}</section>
                <div>Footer</div>
              </main>
            </Providers>
          </TranslationsProvider>
        </Suspense>
      </body>
    </html>
  );
}
