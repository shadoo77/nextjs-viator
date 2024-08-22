import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import qs from 'qs';
import { Image } from '@/types/block';
import { imageBaseUrl } from '@/lib/imageURLs';
import { Coordinates, Destination } from '@/types/destinations';
import { Locale } from '@/i18nConfig';
import { Pricing, Product } from '@/types/products';
import { Filtering } from '@/types/productSearchFilters';
import { ProductFiltering } from '@/types/search';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Check whether it's a server side or client side
export const isSSR = typeof window === 'undefined';

// Check whether it's a development environment
export const isDevelopment = process.env.NODE_ENV === 'development';

// Check if some variable, array or object is empty
export const isEmpty = <T>(value: T): boolean =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

export const getQueryParams = (
  params: Record<string, any>,
  { addQueryPrefix = true }: { addQueryPrefix?: boolean } = {}
) =>
  qs
    .stringify(params, {
      addQueryPrefix,
      skipNulls: true,
      encode: false,
      filter: (prefix, value) => {
        if (typeof value === 'string' && !value.trim()) {
          return;
        }
        return value;
      }
    })
    .toString();

// Parse json safely
export const safelyParseJSON = (jsonString: string | null | undefined) => {
  if (!jsonString) {
    return null;
  }
  let parsed;
  try {
    parsed = JSON.parse(jsonString);
  } catch (e) {
    return null;
  }

  return parsed as Record<string, unknown>;
};

// Highlight search term
export const textHighlighter = ({
  text = '',
  searchTerm = '',
  unHighlightedText = ''
}: {
  text: string;
  searchTerm: string;
  unHighlightedText?: string;
}) => {
  if (!searchTerm) return { __html: text };
  const escapedSearchTerm = searchTerm.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regExp = new RegExp(escapedSearchTerm, 'gi');
  const highlightedText = text.replace(
    regExp,
    (match) => `<strong class="font-bold">${match}</strong>`
  );
  return { __html: `${unHighlightedText} ${highlightedText}` };
};

// Get base image url
export const resizedBaseImageURL = (width?: number, height?: number) => {
  let restPath = 'c_auto,g_auto';
  if (width) restPath += `,w_${width}`;
  if (height) restPath += `,h_${height}`;
  return `${imageBaseUrl}/${restPath}`;
};

// Get image url
export const getImageUrl = ({
  image,
  width,
  height
}: {
  image: Image;
  width?: number;
  height?: number;
}) => {
  const { version, public_id, format } = image;
  const baseImgUrl = resizedBaseImageURL(width, height);
  return `${baseImgUrl}/v${version}/${public_id}.${format}`;
};

// Sanitize html
export const sanitizeHtml = (html: string) => html.replace(/(<([^>]+)>)/gi, '');

// Get location details
export const getLocationDetails = (
  identifire: Product['destinations'] | Destination['destinationId'],
  destinations: Destination[]
) => {
  const productLocatioDetails: {
    locationString: string;
    destination: Destination | null;
  } = { locationString: '', destination: null };
  if (!identifire) return productLocatioDetails;
  let destination = null;
  if (typeof identifire === 'number') {
    destination = destinations.find((destination) => destination.destinationId === identifire);
  } else {
    const productDestinationRef = identifire.find((destination) => destination.primary);
    if (!productDestinationRef) return productLocatioDetails;
    destination = destinations.find(
      (destination) => destination.destinationId === Number(productDestinationRef.ref)
    );
  }

  if (!destination) return productLocatioDetails;
  const lookupId = destination.lookupId;
  productLocatioDetails.destination = destination;
  productLocatioDetails.locationString = lookupId
    .split('.')
    .filter((id, index) => index !== 0)
    .map((id) => {
      const dest = destinations.find((destination) => destination.destinationId === Number(id));
      return dest?.destinationName || '';
    })
    .filter((name) => name)
    .join(', ');

  return productLocatioDetails;
};

// Get currency symbol
export const getCurrencySymbol = ({
  currency,
  locale,
  price
}: {
  currency: string;
  locale: Locale;
  price: number | undefined;
}) => {
  if (price === undefined || price === null) return '';
  const intl = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0
  });

  return intl.format(price);
};

// Get closest location
export const closestLocation = (targetLocation: Coordinates, locationData: Destination[]) => {
  function vectorDistance(dx: number, dy: number) {
    return Math.sqrt(dx * dx + dy * dy);
  }

  function locationDistance(location1: Coordinates, location2: Destination) {
    const dx = location1.latitude - location2.latitude;
    const dy = location1.longitude - location2.longitude;

    return vectorDistance(dx, dy);
  }
  return locationData
    .filter((dest) => dest.destinationType === 'CITY')
    .reduce(function (prev, curr) {
      const prevDistance = locationDistance(targetLocation, prev);
      const currDistance = locationDistance(targetLocation, curr);
      return prevDistance < currDistance ? prev : curr;
    });
};

// Get pluralized string
export const pluralize = (count: number, singular: string, plural = singular + 's') => {
  const pluralRules = new Intl.PluralRules('en', { type: 'cardinal' });
  const pluralForm = pluralRules.select(count);
  switch (pluralForm) {
    case 'one':
      return `${count} ${singular}`;
    case 'other':
      return `${count} ${plural}`;
    default:
      return '';
  }
};

// Get pagination buttons
export const getPaginationButtons = (
  activePage: number,
  totalPages: number,
  isLargeDevices: boolean
) => {
  if (totalPages <= 5) {
    const pages = [...new Array(totalPages)].map((_, index) => index + 1);
    return pages;
  }
  const pages: (number | string)[] = [1];
  // large devices
  if (isLargeDevices) {
    if (activePage >= 4) {
      pages.push('...');
    }
    if (activePage + 1 > totalPages) {
      pages.push(activePage - 2);
    }
    if (activePage - 1 > 1) {
      pages.push(activePage - 1);
    }
    if (activePage !== 1) {
      pages.push(activePage);
    }
    if (activePage + 1 <= totalPages) {
      pages.push(activePage + 1);
    }
    if (activePage - 1 <= 0) {
      pages.push(activePage + 2);
    }
    if (activePage + 2 < totalPages) {
      pages.push('...');
    }
    if (activePage + 1 < totalPages) {
      pages.push(totalPages);
    }
    return pages;
  }
  // small devices
  if (activePage === 1) {
    pages.push(2, 3, '...', totalPages);
  }
  if (activePage === 2) {
    pages.push(2, '...', totalPages);
  }
  if (activePage > 2 && activePage < totalPages - 1) {
    pages.push('...', activePage, '...', totalPages);
  }
  if (activePage > 2 && activePage === totalPages - 1) {
    pages.push('...', activePage, totalPages);
  }
  if (activePage > 2 && activePage === totalPages) {
    pages.push('...', activePage - 2, activePage - 1, activePage);
  }
  return pages;
};

// Get prices
export const getPrices = (pricing: Pricing | undefined, locale: Locale) => {
  if (!pricing?.summary) return null;

  const { currency, summary } = pricing;

  const price = getCurrencySymbol({
    currency,
    locale,
    price: summary.fromPrice
  });

  const priceBeforeDiscount = getCurrencySymbol({
    currency,
    locale,
    price:
      summary?.fromPriceBeforeDiscount && summary?.fromPriceBeforeDiscount !== summary?.fromPrice
        ? summary?.fromPriceBeforeDiscount
        : undefined
  });

  const saving = getCurrencySymbol({
    currency,
    locale,
    price: summary?.fromPriceBeforeDiscount
      ? summary?.fromPriceBeforeDiscount - summary?.fromPrice
      : 0
  });

  return { price, priceBeforeDiscount, saving, fromPrice: summary.fromPrice };
};

// Get active filters count
export const getActiveFiltersCount = ({
  tags,
  flags,
  rating,
  durationInMinutes,
  highestPrice
}: Filtering) => {
  let filtersCount = 0;
  if (tags) filtersCount += tags.length;
  if (flags) filtersCount += flags.length;
  if (rating) filtersCount++;
  if (durationInMinutes) filtersCount++;
  if (highestPrice) filtersCount++;
  return filtersCount;
};

// Get active filters count
export const getSearchResultsActiveFiltersCount = (
  productFiltering: ProductFiltering | undefined
) => {
  if (!productFiltering) return 0;
  const {
    flags,
    rating,
    durationInMinutes,
    price,
    destination,
    dateRange,
    includeAutomaticTranslations
  } = productFiltering;
  let filtersCount = 0;
  if (flags) filtersCount += flags.length;
  if (rating) filtersCount++;
  if (durationInMinutes) filtersCount++;
  if (price) filtersCount++;
  if (destination) filtersCount++;
  if (dateRange) filtersCount++;
  if (includeAutomaticTranslations) filtersCount++;
  return filtersCount;
};
