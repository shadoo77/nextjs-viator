export type Attraction = {
  id: number;
  name: string;
  primaryDestinationId: number;
  description: string;
  destinationName: string;
  productsCount: number;
  translationInfo: TranslationInfo;
  reviews: Reviews;
  images: Image[];
  url: string;
};

export interface TranslationInfo {
  containsMachineTranslatedText: boolean;
}

export interface Reviews {
  sources: Source[];
  reviewCountTotals: ReviewCount[];
  totalReviews: number;
  combinedAverageRating: number;
}

export interface Source {
  provider: string;
  reviewCounts: ReviewCount[];
  totalCount: number;
  averageRating: number;
}

export interface ReviewCount {
  rating: number;
  count: number;
}

export interface Image {
  imageSource: string;
  isCover: boolean;
  variants: Variant[];
  caption?: string;
}

export interface Variant {
  height: number;
  width: number;
  url: string;
}
