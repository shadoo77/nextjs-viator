import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { LuMapPin } from 'react-icons/lu';
import { Product } from '@/types/products';
import { Locale } from '@/i18nConfig';
import { cn, getCurrencySymbol, getLocationDetails } from '@/lib/utils';
import RatingReview from '@/components/atoms/RatingReview';
import localizeDestinations from '@/lib/destinations';

export default function TourCardShort({
  productCode,
  title,
  reviews,
  pricing,
  destinations,
  images
}: Product) {
  const { t } = useTranslation();
  const { locale }: { locale: Locale } = useParams();
  const allDestinations = localizeDestinations[locale];
  if (!allDestinations) return null;

  const price = getCurrencySymbol({
    currency: pricing.currency,
    locale,
    price: pricing?.summary.fromPrice
  });

  const { city, country, region } = getLocationDetails(allDestinations.data, destinations);

  const image = images[0];

  const imageVariant = image.variants.find(
    (variant) => variant.width === 540 && variant.height === 360
  );

  return (
    <div className="pb-4 h-full">
      <div className="flex flex-col gap-2 overflow-hidden rounded bg-white text-slate-500 drop-shadow-md hover:drop-shadow-lg shadow-md hover:shadow-lg shadow-slate-200 group cursor-pointer h-full">
        {/*  <!-- Image --> */}
        <figure>
          <Image
            src={imageVariant?.url || ''}
            alt={image.caption || title}
            width={imageVariant?.width}
            height={imageVariant?.height}
            className={cn('aspect-video w-full', {
              'object-cover': image.isCover
            })}
          />
        </figure>
        {/*  <!-- Body--> */}
        <span className="text-sm text-muted-foreground px-4 flex gap-2 items-center">
          <LuMapPin className="w-5 h-5" />{' '}
          <p>{`${city}, ${region ? region + ', ' : ''}${country}`}</p>
        </span>
        <div className="px-4 py-2 flex flex-col gap-4 justify-between">
          <header>
            <h3 className="text-base font-bold text-slate-700 group-hover:underline line-clamp-3">
              {title}
            </h3>
          </header>
          <section>
            {reviews && (
              <span className="flex gap-3">
                <RatingReview averageRating={reviews.combinedAverageRating} />
                <span>{reviews.totalReviews.toLocaleString()}</span>
              </span>
            )}
            {pricing.summary.fromPrice && (
              <span className="mt-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span className="lowercase">{t('price.from')}</span>
                <span className="font-bold">{price}</span>
                {pricing.summary.fromPrice >= 100 && (
                  <span className="w-full">{t('price.variesByGroupSize')}</span>
                )}
              </span>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
