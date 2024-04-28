import { Product } from '@/types/products';
import { Attraction } from '@/types/attractions';

export interface SearchFilter {
  searchTerm: string;
  productFiltering?: ProductFiltering;
  productSorting?: ProductSorting;
  searchTypes: SearchType[];
  currency: Currency;
}

export type ProductFiltering = {
  destination?: string | number;
  dateRange?: DateRange;
  price?: NumberRange;
  rating?: NumberRange;
  durationInMinutes?: NumberRange;
  flags?: ProductSearchFlag[];
  includeAutomaticTranslations?: boolean;
};

// iso date format
export type DateRange = {
  from: string;
  to: string;
};

export type NumberRange = {
  from: number;
  to: number;
};

export interface ProductSorting {
  sort: 'DEFAULT' | 'ITINERARY_DURATION' | 'PRICE' | 'REVIEW_AVG_RATING' | 'DATE_ADDED';
  order: 'ASCENDING' | 'DESCENDING';
}

export interface SearchType {
  searchType: 'ATTRACTIONS' | 'DESTINATIONS' | 'PRODUCTS';
  pagination: Pagination;
}

export interface Pagination {
  start: number;
  count: number;
}

export type ProductSearchFlag =
  | 'NEW_ON_VIATOR'
  | 'VIATOR_EXCLUSIVE'
  | 'SKIP_THE_LINE'
  | 'PRIVATE_TOUR'
  | 'LIKELY_TO_SELL_OUT'
  | 'SPECIAL_OFFER';

export type Currency =
  | 'AUD'
  | 'BRL'
  | 'CAD'
  | 'CHF'
  | 'DKK'
  | 'EUR'
  | 'GBP'
  | 'HKD'
  | 'INR'
  | 'JPY'
  | 'NOK'
  | 'NZD'
  | 'SEK'
  | 'SGD'
  | 'TWD'
  | 'USD'
  | 'ZAR';

// ************************ search results ************************

export type DestinationSearchResults = {
  id: number;
  name: string;
  parentDestinationId: number;
  parentDestinationName: string;
  translationDetails: {
    containsMachineTranslatedText: boolean;
    translationSource: 'MACHINE' | 'ORIGINAL' | 'MANUAL';
    translationAttribution: string;
  };
  url: string;
};

export type SearchResults = {
  products: {
    totalCount: number;
    results: Product[];
  };
  destinations: {
    totalCount: number;
    results: DestinationSearchResults[];
  };
  attractions: {
    totalCount: number;
    results: Attraction[];
  };
};
