export interface Product {
  productCode: string;
  title: string;
  description: string;
  images: Image[];
  duration?: Duration;
  itineraryType: 'STANDARD' | 'ACTIVITY' | 'MULTI_DAY_TOUR' | 'HOP_ON_HOP_OFF' | 'UNSTRUCTURED';
  pricing: Pricing;
  productUrl: string;
  destinations: {
    ref: string;
    primary: boolean;
  }[];
  tags: number[];
  flags: Flag[];
  confirmationType: 'INSTANT' | 'MANUAL' | 'INSTANT_THEN_MANUAL';
  translationInfo: TranslationInfo;
  reviews?: Reviews;
}

export type Flag =
  | 'NEW_ON_VIATOR'
  | 'VIATOR_EXCLUSIVE'
  | 'FREE_CANCELLATION'
  | 'SKIP_THE_LINE'
  | 'PRIVATE_TOUR'
  | 'SPECIAL_OFFER'
  | 'LIKELY_TO_SELL_OUT';

export interface Image {
  imageSource: 'SUPPLIER_PROVIDED' | 'PROFESSIONAL';
  caption: string;
  isCover: boolean;
  variants: Variant[];
}

export interface Variant {
  height: number;
  width: number;
  url: string;
}

export interface Duration {
  fixedDurationInMinutes?: number;
  variableDurationFromMinutes?: number;
  variableDurationToMinutes?: number;
  unstructuredDuration?: string;
}

export interface Pricing {
  summary: Summary;
  currency: string;
  partnerNetFromPrice?: number;
}

export interface Summary {
  fromPrice: number;
  fromPriceBeforeDiscount: number;
}

export interface TranslationInfo {
  containsMachineTranslatedText: boolean;
  translationSource: 'MACHINE' | 'ORIGINAL' | 'MANUAL';
  translationAttribution?: string;
}

export type ReviewCount = {
  rating: number;
  count: number;
};

export interface Reviews {
  sources: Source[];
  reviewCountTotals?: ReviewCount[];
  totalReviews: number;
  combinedAverageRating: number;
}

export interface Source {
  provider: 'VIATOR' | 'TRIPADVISOR';
  reviewCounts?: ReviewCount[];
  totalCount: number;
  averageRating: number;
}

export type ProductSearchResults = { products: Product[]; totalCount: number };
