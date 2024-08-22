import { Currency } from '@/types/search';

export interface ProductSearchFilters {
  filtering: Filtering;
  sorting?: {
    sort: 'DEFAULT' | 'ITINERARY_DURATION' | 'PRICE' | 'TRAVELER_RATING' | 'DATE_ADDED';
    order?: 'ASCENDING' | 'DESCENDING';
  };
  pagination?: {
    start: number;
    count: number;
  };
  currency: Currency;
}

export type Flag =
  | 'NEW_ON_VIATOR'
  | 'VIATOR_EXCLUSIVE'
  | 'FREE_CANCELLATION'
  | 'SKIP_THE_LINE'
  | 'PRIVATE_TOUR'
  | 'SPECIAL_OFFER'
  | 'LIKELY_TO_SELL_OUT';

export interface Filtering {
  destination: string;
  tags?: number[];
  flags?: Flag[];
  confirmationType?: 'INSTANT';
  rating?: {
    from: number;
    to: number;
  };
  durationInMinutes?: {
    from?: number;
    to?: number;
  };
  includeAutomaticTranslations?: boolean;
  attractionId?: number;
  lowestPrice?: number;
  highestPrice?: number;
  startDate?: string;
  endDate?: string;
}
