'use client';

import { useTranslation } from 'react-i18next';
import SectionWithTitle from '@/components/templates/SectionWithTitle';
import { Locale } from '@/i18nConfig';
import { useBlock } from '@/tanstack/queries/block';
import { Skeleton } from '@/components/ui/skeleton';
import Link from '@/components/atoms/NextLink';
import { getImageUrl } from '@/lib/utils';
import { ErrorAlert } from '@/components/molecules/ErrorAlert';

export default function PopularDestinations({ locale }: { locale: Locale }) {
  const { t } = useTranslation();
  const { data, error, isLoading, isFetching } = useBlock({
    blockType: 'popular_destinations'
  });

  const destinationsNumber = 12;

  // We could set the title from the CMS, but it's not necessary
  // because I would like to show it whether there is data or not

  return (
    <SectionWithTitle title={t('homePage.popularDestinationSection.title')}>
      <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
        {error instanceof Error && (
          <ErrorAlert
            title={t('error.title')}
            description={t('error.description')}
            withTryAgainButton
            className="col-span-12 mx-auto"
          />
        )}
        {(isLoading || isFetching) &&
          new Array(destinationsNumber).fill(0).map((_, index) => (
            <div className="col-span-2" key={index}>
              <Skeleton className="h-32 w-full" />
            </div>
          ))}
        {!data
          ? null
          : data.includes.Entry.map(({ fields, sys }) => (
              <div className="col-span-2" key={sys.id}>
                {isLoading || isFetching ? (
                  <Skeleton className="h-32 w-full" />
                ) : (
                  <Link
                    href={`/tours/${fields.destinationUrlName}/did-${fields.id}`}
                    style={{
                      backgroundImage: `url('${getImageUrl({ image: fields.image[0], width: 400, height: 300 })}')`
                    }}
                    className="group relative flex h-32 w-full items-center justify-center rounded-md bg-cover bg-center font-extrabold transition-all duration-300 hover:scale-110"
                    locale={locale}
                  >
                    <div className="absolute inset-0 z-[1] rounded-md bg-black opacity-40 transition-all duration-300 group-hover:opacity-5" />
                    <span className="z-[1] text-primary-foreground">{fields.name}</span>
                  </Link>
                )}
              </div>
            ))}
      </div>
    </SectionWithTitle>
  );
}
