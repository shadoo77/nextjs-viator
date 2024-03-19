import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import i18nConfig, { Locale } from '@/i18nConfig';
import initTranslations from '@/i18n';
import '@/app/globals.css';
import Providers from '@/lib/Providers';
import TranslationsProvider from '@/lib/TranslationsProvider';
import { Toaster } from '@/components/ui/sonner';
import TopNavbar from '@/components/organisms/TopNavbar';
import ScrollToTop from '@/components/organisms/ScrollToTop';
import { Loader } from '@/components/molecules/Loader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Marketplace',
  description: 'A marketplace for wall painting jobs'
};

interface Props {
  children: ReactNode;
  params: { locale: Locale };
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function Layout({ children, params: { locale } }: Props) {
  const { resources } = await initTranslations(locale);

  return (
    <html lang={locale}>
      <body className={inter.className} suppressHydrationWarning>
        <Suspense fallback={<Loader />}>
          <TranslationsProvider locale={locale} resources={resources}>
            <Providers>
              <TopNavbar />
              <ScrollToTop />
              <Toaster richColors />
              <main className="container bg-background">{children}</main>
            </Providers>
          </TranslationsProvider>
        </Suspense>
      </body>
    </html>
  );
}
