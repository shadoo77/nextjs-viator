export interface Product {
  productCode: string;
  title: string;
  description: string;
  images: Image[];
  duration: Duration;
  confirmationType: string;
  itineraryType: string;
  pricing: Pricing;
  productUrl: string;
  destinations: {
    ref: string;
    primary: boolean;
  }[];
  tags: number[];
  flags: string[];
  translationInfo: TranslationInfo;
  reviews?: Reviews;
}

export interface Image {
  imageSource: string;
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
}

export interface Pricing {
  summary: Summary;
  currency: string;
}

export interface Summary {
  fromPrice: number;
  fromPriceBeforeDiscount: number;
}

export interface TranslationInfo {
  containsMachineTranslatedText: boolean;
  translationSource: string;
}

export interface Reviews {
  sources: Source[];
  totalReviews: number;
  combinedAverageRating: number;
}

export interface Source {
  provider: string;
  totalCount: number;
  averageRating: number;
}
