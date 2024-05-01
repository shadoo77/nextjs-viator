'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'usehooks-ts';
import { Heart, Share2, Clock, Ban } from 'lucide-react';
import Price from '@/components/organisms/Tours/Price';
import { Product } from '@/types/products';
import Link from '@/components/atoms/NextLink';
import RatingReview from '@/components/atoms/RatingReview';
import { Locale } from '@/i18nConfig';
import { Button } from '@/components/ui/button';
import { useDuration } from '@/hooks/useDuration';
import { Badge } from '@/components/ui/badge';
import { cn, getPrices } from '@/lib/utils';
import { useDestinations } from '@/tanstack/queries/destinations';

export default function TourItem({ product }: { product: Product }) {
  const { title, description, reviews, pricing, flags, duration, images } = product;
  const { locale, slug }: { locale: Locale; slug: string[] } = useParams();
  const { t } = useTranslation();
  const min390MaxXS = useMediaQuery('(min-width: 390px) and (max-width: 480px)');
  const matchMinWidthSM = useMediaQuery('(min-width: 640px)');
  const destinationId = slug[1].replace('did-', '').trim();
  const { data: destination } = useDestinations({
    select: (data) => {
      return data.data.find((d) => d.destinationId === Number(destinationId));
    }
  });

  const image = images?.[0];

  const imageVariant = image?.variants.find(
    (variant) =>
      variant.width === (matchMinWidthSM || min390MaxXS ? 540 : 360) &&
      variant.height === (matchMinWidthSM || min390MaxXS ? 360 : 240)
  );

  const prices = getPrices(pricing, locale);

  const durationText = useDuration({ duration });
  const likelyToSellOut = flags.includes('LIKELY_TO_SELL_OUT') ? t('flags.likelyToSellOut') : '';

  const Footer = (
    <section className="flex flex-row-reverse items-center gap-2 pb-2 text-secondary-foreground sm:pb-0">
      <Button
        size="icon"
        variant="ghost"
        className="text-sm text-primary hover:bg-primary/10 hover:text-primary"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Heart className="h-5 w-5" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="text-sm text-primary hover:bg-primary/10 hover:text-primary"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Share2 className="h-5 w-5" />
      </Button>
    </section>
  );

  return (
    <Link
      href={`/tours/${destination?.destinationUrlName}/did-${destination?.destinationId}/tid-${product.productCode}`}
    >
      <div className="group box-border flex h-full flex-col overflow-hidden rounded border-r border-t border-slate-200 bg-white text-slate-500 shadow-md shadow-slate-200 sm:flex-row sm:p-4">
        {/*  <!-- Image --> */}
        <figure className="relative overflow-hidden rounded-sm sm:basis-5/12">
          <Image
            src={imageVariant?.url || ''}
            alt={image?.caption || title || ''}
            width={matchMinWidthSM ? imageVariant?.width : 0}
            height={matchMinWidthSM ? imageVariant?.height : 0}
            sizes="100vw"
            className={cn(
              'aspect-auto min-h-full object-cover transition-all duration-300 group-hover:scale-110',
              { 'h-auto w-full': !matchMinWidthSM }
            )}
          />
          {likelyToSellOut && (
            <Badge variant="destructive" className="absolute left-2 top-2 rounded-sm text-sm">
              {likelyToSellOut}
            </Badge>
          )}
        </figure>
        {/*  <!-- Body--> */}
        <div className="flex flex-col px-3 pt-4 sm:ml-5 sm:basis-7/12 sm:px-0 sm:pt-0">
          {/* <section> */}
          <header className="mb-4 flex">
            <div>
              {title && (
                <h3 className="line-clamp-3 text-lg font-bold text-secondary-foreground group-hover:underline sm:text-xl">
                  {title}
                </h3>
              )}
              <Price prices={prices} />
            </div>
          </header>
          {/* description */}
          {matchMinWidthSM && description && (
            <p
              dangerouslySetInnerHTML={{ __html: description }}
              className="mb-4 line-clamp-2 text-sm lg:line-clamp-3"
            />
          )}
          {/*  additions */}
          {(durationText || flags.includes('FREE_CANCELLATION')) && (
            <ul className="mb-2 text-secondary-foreground">
              {durationText && (
                <li className="flex items-center gap-3 py-1">
                  <Clock className="h-5 w-5" />
                  <span className="text-sm ">{durationText}</span>
                </li>
              )}
              {flags.includes('FREE_CANCELLATION') && (
                <li className="flex items-center gap-3 py-1">
                  <Ban className="h-5 w-5" />
                  <span className="text-sm ">{t('toursPage.freeCancellation')}</span>
                </li>
              )}
            </ul>
          )}
          <div className="mb-2 flex flex-row items-center justify-between gap-2 sm:flex-row-reverse">
            {matchMinWidthSM && Footer}
            {reviews && (
              <span className="flex gap-3 text-sm">
                <RatingReview averageRating={reviews.combinedAverageRating} />
                <span>{reviews.totalReviews.toLocaleString()}</span>
              </span>
            )}
          </div>
          {/* </section> */}
          {!matchMinWidthSM && Footer}
        </div>
      </div>
    </Link>
  );
}
