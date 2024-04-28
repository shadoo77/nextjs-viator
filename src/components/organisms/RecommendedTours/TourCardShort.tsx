import Image from 'next/image';
import { LuMapPin } from 'react-icons/lu';
import { Product } from '@/types/products';
import { getLocationDetails, getPrices } from '@/lib/utils';
import RatingReview from '@/components/atoms/RatingReview';
import Link from '@/components/atoms/NextLink';
import { useDestinations } from '@/tanstack/queries/destinations';
import Price from '@/components/organisms/Tours/Price';
import { useLocale } from '@/hooks/useLocale';

export default function TourCardShort({
  productCode,
  title,
  reviews,
  pricing,
  destinations: productDestinations,
  images
}: Product) {
  const { locale } = useLocale();
  const { data: destinationsResponse } = useDestinations();

  if (!destinationsResponse || !destinationsResponse?.data?.length) return null;

  const { locationString, destination } = getLocationDetails(
    productDestinations,
    destinationsResponse.data
  );
  if (!destination || !locationString) return null;

  const prices = getPrices(pricing, locale);
  const image = images?.[0];
  const imageVariant = image?.variants.find(
    (variant) => variant.width === 540 && variant.height === 360
  );

  return (
    <div className="h-full pb-4">
      <Link
        href={`/tours/${destination.destinationUrlName}/did-${destination.destinationId}/tid-${productCode}`}
      >
        <div className="group flex h-full flex-col gap-2 overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 drop-shadow-md hover:shadow-lg hover:drop-shadow-lg">
          {/*  <!-- Image --> */}
          <figure className="overflow-hidden">
            <Image
              src={imageVariant?.url || ''}
              alt={image?.caption || title || ''}
              width={imageVariant?.width}
              height={imageVariant?.height}
              className="aspect-video w-full object-cover transition-all duration-300 group-hover:scale-110"
            />
          </figure>
          {/*  <!-- Body--> */}
          <div className="flex gap-2 px-4 text-sm text-muted-foreground">
            <span>
              <LuMapPin className="h-5 w-5" />
            </span>
            <p>{locationString}</p>
          </div>
          <div className="flex flex-col justify-between gap-4 px-4 py-2">
            <header>
              {title && (
                <h3 className="line-clamp-3 text-base font-bold text-slate-700 group-hover:underline">
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
              <Price prices={prices} />
            </section>
          </div>
        </div>
      </Link>
    </div>
  );
}
