import { useParams } from 'next/navigation';
import Image from 'next/image';
import { LuMapPin } from 'react-icons/lu';
import { Product } from '@/types/products';
import { Locale } from '@/i18nConfig';
import { getLocationDetails, getPrices } from '@/lib/utils';
import RatingReview from '@/components/atoms/RatingReview';
import Link from '@/components/atoms/NextLink';
import { useDestinations } from '@/tanstack/queries/destinations';
import Price from '@/components/organisms/Tours/Price';

export default function TourCardShort({
  productCode,
  title,
  reviews,
  pricing,
  destinations,
  images
}: Product) {
  const { locale }: { locale: Locale } = useParams();
  const { data: allDestinations } = useDestinations(locale);
  const prices = getPrices(pricing, locale);

  if (!allDestinations) return null;

  const productDestination = destinations.find((destination) => destination.primary);

  const { city, country, region, destinationUrlName, destinationId } = getLocationDetails(
    allDestinations.data,
    productDestination?.ref
  );

  const image = images?.[0];

  const imageVariant = image?.variants.find(
    (variant) => variant.width === 540 && variant.height === 360
  );

  return (
    <div className="pb-4 h-full">
      <Link href={`/tours/${destinationUrlName}/did-${destinationId}/tid-${productCode}`}>
        <div className="flex flex-col gap-2 overflow-hidden rounded bg-white text-slate-500 drop-shadow-md hover:drop-shadow-lg shadow-md hover:shadow-lg shadow-slate-200 group h-full">
          {/*  <!-- Image --> */}
          <figure className="overflow-hidden">
            <Image
              src={imageVariant?.url || ''}
              alt={image?.caption || title || ''}
              width={imageVariant?.width}
              height={imageVariant?.height}
              className="aspect-video w-full group-hover:scale-110 transition-all duration-300 object-cover"
            />
          </figure>
          {/*  <!-- Body--> */}
          <span className="text-sm text-muted-foreground px-4 flex gap-2 items-center">
            <LuMapPin className="w-5 h-5" />{' '}
            <p>{`${city}, ${region ? region + ', ' : ''}${country}`}</p>
          </span>
          <div className="px-4 py-2 flex flex-col gap-4 justify-between">
            <header>
              {title && (
                <h3 className="text-base font-bold text-slate-700 group-hover:underline line-clamp-3">
                  {title}
                </h3>
              )}
            </header>
            <section>
              {reviews && (
                <span className="flex gap-3">
                  <RatingReview averageRating={reviews.combinedAverageRating} />
                  <span>{reviews.totalReviews.toLocaleString()}</span>
                </span>
              )}
              {/* {prices?.fromPrice && (
                <span className="mt-2 flex flex-wrap gap-2 text-sm text-slate-400">
                  <span className="lowercase">{t('price.from')}</span>
                  <span className="font-bold text-muted-foreground">{prices.price}</span>
                  {prices.priceBeforeDiscount && (
                    <>
                      <span className="font-bold line-through text-black">
                        {prices.priceBeforeDiscount}
                      </span>
                      <span className="font-normal text-destructive">
                        {t('savings', { mount: prices.saving })}
                      </span>
                    </>
                  )}
                  {prices.fromPrice >= 100 && (
                    <span className="w-full">{t('price.variesByGroupSize')}</span>
                  )}
                </span>
              )} */}
              <Price prices={prices} />
            </section>
          </div>
        </div>
      </Link>
    </div>
  );
}
