import { ParsedUrlQuery } from 'querystring';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getHostName } from '@/lib/serverActions';

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

// Get server api url by host
export const getServerApiUrlByHost = async (url: string) => {
  try {
    if (!isSSR) {
      return process.env.NEXT_PUBLIC_VIATOR_API_URL_TEST ? url : `${location.origin}/api${url}`;
    }
    const host = await getHostName();
    const currentUrl = isDevelopment ? `http://${host}/api` : `https//${host}/api`;
    return `${currentUrl}${url}`;
  } catch (error) {
    return url;
  }
};
