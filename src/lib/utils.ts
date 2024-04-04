import { ParsedUrlQuery } from 'querystring';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Image } from '@/types/block';
import { imageBaseUrl } from '@/lib/imageURLs';
import { Coordinates, Destination } from '@/types/destinations';
import { Product } from '@/types/products';
import { Locale } from '@/i18nConfig';

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

// Get query string based on flatted object
export function getQueryString(params: ParsedUrlQuery | Record<string, unknown>) {
  if (!params) {
    return '';
  }
  const esc = encodeURIComponent;
  return `${Object.keys(params)
    .filter((param) => params[param] !== null && params[param] !== undefined)
    .map((param) => `${esc(param)}=${esc(params[param] as string)}`)
    .join('&')}`;
}

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
  searchTerm = ''
}: {
  text: string;
  searchTerm: string;
}) => {
  if (!searchTerm) return { __html: text };
  const escapedSearchTerm = searchTerm.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regExp = new RegExp(escapedSearchTerm, 'gi');
  const highlightedText = text.replace(
    regExp,
    (match) => `<strong class="font-bold">${match}</strong>`
  );
  return { __html: highlightedText };
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
  allDestinations: Destination[],
  destinations: Product['destinations']
) => {
  const location = {
    destinationUrlName: '',
    city: '',
    region: '',
    country: ''
  };

  const productLocation = destinations.find((destination) => destination.primary);
  if (!productLocation) return location;

  const destination = allDestinations?.find(
    (des) => des.destinationId === Number(productLocation?.ref)
  );
  if (!destination) return location;

  location.city = destination.destinationName;
  location.destinationUrlName = destination.destinationUrlName;

  const parentDestination = allDestinations.find(
    (des) => des.destinationId === destination.parentId
  );

  if (parentDestination?.destinationType === 'COUNTRY') {
    location.country = parentDestination.destinationName;
    return location;
  }

  if (parentDestination?.destinationType === 'REGION') {
    location.region = parentDestination.destinationName;
    const regionDestination = allDestinations.find(
      (des) => des.destinationId === parentDestination.parentId
    );
    location.country = regionDestination?.destinationName || '';
  }

  return location;
};

// Get currency symbol
export const getCurrencySymbol = ({
  currency,
  locale,
  price
}: {
  currency: string;
  locale: Locale;
  price: number;
}) => {
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
    var dx = location1.latitude - location2.latitude,
      dy = location1.longitude - location2.longitude;

    return vectorDistance(dx, dy);
  }

  return locationData.reduce(function (prev, curr) {
    var prevDistance = locationDistance(targetLocation, prev),
      currDistance = locationDistance(targetLocation, curr);
    return prevDistance < currDistance ? prev : curr;
  });

  // const { location, error: geoErr } = useGeolocation();
  // const destinations = localizeDestinations[locale].data;

  // if (location) {
  //   const dests = destinations.filter((dest) => dest.destinationType === 'CITY');
  //   const nearestCity = closestLocation(location, dests);
  // }
};
