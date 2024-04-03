'use client';

import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';
import SectionWithTitle from '@/components/templates/SectionWithTitle';
import { Locale } from '@/i18nConfig';
import { useBlock } from '@/tanstack/queries/block';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import Link from '@/components/atoms/NextLink';
import { getImageUrl } from '@/lib/utils';

export default function PopularDestinations({ locale }: { locale: Locale }) {
  const { t } = useTranslation();
  const { data, error, isLoading, isFetching } = useBlock({
    locale,
    blockType: 'popular_destinations'
  });

  const destinationsNumber = 12;

  // We could set the title from the CMS, but it's not necessary
  // because I would like to show it whether there is data or not

  return (
    <SectionWithTitle title={t('homePage.popularDestinationSection.title')}>
      <div className="grid gap-6 grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
        {error instanceof Error && (
          <div className="flex justify-center mx-auto col-span-12">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t('error.title')}</AlertTitle>
              <AlertDescription>{t('error.description')}</AlertDescription>
            </Alert>
          </div>
        )}
        {(isLoading || isFetching) &&
          new Array(destinationsNumber).fill(0).map((_, index) => (
            <div className="col-span-2" key={index}>
              <Skeleton className="w-full h-32" />
            </div>
          ))}
        {!data
          ? null
          : data.includes.Entry.map(({ fields, sys }) => (
              <div className="col-span-2" key={sys.id}>
                {isLoading || isFetching ? (
                  <Skeleton className="w-full h-32" />
                ) : (
                  <Link
                    href={`/destination/${fields.id}`}
                    style={{
                      backgroundImage: `url('${getImageUrl({ image: fields.image[0], width: 400, height: 300 })}')`
                    }}
                    className="relative w-full h-32 rounded-md flex items-center justify-center font-extrabold transition-all duration-300 hover:scale-110 group bg-cover bg-center"
                    locale={locale}
                  >
                    <div className="rounded-md inset-0 absolute z-[1] bg-black transition-all duration-300 opacity-40 group-hover:opacity-5" />
                    <span className="text-primary-foreground z-10">{fields.name}</span>
                  </Link>
                )}
              </div>
            ))}
      </div>
    </SectionWithTitle>
  );
}
