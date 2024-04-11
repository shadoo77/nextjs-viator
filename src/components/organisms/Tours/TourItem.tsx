'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'usehooks-ts';
import { Heart, Share2, Clock, Ban } from 'lucide-react';
import Price from '@/components/organisms/Tours/Price';
import { Product } from '@/types/products';
import Link from '@/components/atoms/NextLink';
import { useDestinationStore } from '@/store/destination';
import RatingReview from '@/components/atoms/RatingReview';
import { Locale } from '@/i18nConfig';
import { Button } from '@/components/ui/button';
import { useDuration } from '@/hooks/useDuration';
import { Badge } from '@/components/ui/badge';
import { usePricing } from '@/hooks/usePricing';

export default function TourItem({ product }: { product: Product }) {
  const { title, description, reviews, pricing, flags, duration, images } = product;
  const { t } = useTranslation();
  const matchMinWidthSM = useMediaQuery('(min-width: 640px)');
  const { locale }: { locale: Locale } = useParams();
  const destination = useDestinationStore((state) => state.destination);

  const image = images?.[0];

  const imageVariant = image?.variants.find(
    (variant) => variant.width === 540 && variant.height === 360
  );

  const prices = usePricing({ pricing, locale });

  const durationText = useDuration({ duration });
  const likelyToSellOut = flags.includes('LIKELY_TO_SELL_OUT') ? t('flags.likelyToSellOut') : '';

  return (
    <Link
      href={`/tours/${destination?.destinationUrlName}/did-${destination?.destinationId}/tid-${product.productCode}`}
    >
      <div className="sm:p-4 flex flex-col overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200 sm:flex-row border-t border-r border-slate-200 box-border group h-full">
        {/*  <!-- Image --> */}
        <figure className="sm:basis-5/12 md:basis-1/2 relative overflow-hidden rounded-sm">
          <Image
            src={imageVariant?.url || ''}
            alt={image?.caption || title || ''}
            width={imageVariant?.width}
            height={imageVariant?.height}
            className="aspect-auto min-h-full object-cover group-hover:scale-110 transition-all duration-300"
          />
          {likelyToSellOut && (
            <Badge variant="destructive" className="absolute top-2 left-2 rounded-sm text-sm">
              {likelyToSellOut}
            </Badge>
          )}
        </figure>
        {/*  <!-- Body--> */}
        <div className="sm:basis-7/12 md:basis-1/2 px-3 pt-4 sm:pt-0 sm:ml-5 sm:px-0 flex flex-col h-fit flex-1">
          <header className="flex mb-4">
            <div>
              {title && (
                <h3 className="text-lg sm:text-xl font-bold text-secondary-foreground group-hover:underline line-clamp-3">
                  {title}
                </h3>
              )}
              <Price prices={prices} />
            </div>
          </header>
          {/* description */}
          {matchMinWidthSM && description && (
            <p dangerouslySetInnerHTML={{ __html: description }} className="line-clamp-4 mb-4" />
          )}
          {/*  additions */}
          {(durationText || flags.includes('FREE_CANCELLATION')) && (
            <ul className="text-secondary-foreground mb-2">
              {durationText && (
                <li className="flex items-center gap-3 py-1">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm ">{durationText}</span>
                </li>
              )}
              {flags.includes('FREE_CANCELLATION') && (
                <li className="flex items-center gap-3 py-1">
                  <Ban className="w-5 h-5" />
                  <span className="text-sm ">{t('toursPage.freeCancellation')}</span>
                </li>
              )}
            </ul>
          )}
          {/* footer (reviews & action buttons) */}
          <div className="flex flex-col-reverse flex-1 pb-2 sm:pb-0 sm:flex-auto sm:flex-row-reverse sm:justify-between sm:items-center text-secondary-foreground">
            <div className="flex justify-end gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="text-primary hover:text-primary hover:bg-primary/10 text-sm"
              >
                <Heart className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-primary hover:text-primary hover:bg-primary/10 text-sm"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
            {reviews && (
              <span className="flex gap-3 text-sm">
                <RatingReview averageRating={reviews.combinedAverageRating} />
                <span>{reviews.totalReviews.toLocaleString()}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
