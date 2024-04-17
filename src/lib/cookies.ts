'use client';

import { isSSR } from '@/lib/utils';

interface ICookieObject {
  [key: string]: string;
}

let cookieObject: ICookieObject | null = null;

const setCookieObject = () => {
  if (!isSSR && document && document.cookie) {
    cookieObject = document.cookie.split(';').reduce((res, item) => {
      const data = item.trim().split('=');
      return { ...res, [data[0]]: data[1] };
    }, {} as ICookieObject);
  }
};

setCookieObject();

export const getCookieObject = () => {
  if (cookieObject) {
    return cookieObject;
  }
  setCookieObject();

  return cookieObject;
};

export const getCookie = (cname: string): string => {
  if (cookieObject?.[cname]) {
    return cookieObject[cname];
  }
  return '';
};

export const setCookie = ({
  cname,
  value,
  path = '/',
  days = 30
}: {
  cname: string;
  value: string;
  path?: string;
  days?: number;
  nextLocale?: string;
}): void => {
  if (!isSSR && !document) {
    return;
  }
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  if (cookieObject) {
    cookieObject[cname] = value;
  }
  document.cookie = `${cname}=${value}; path=${path}; expires=${date.toUTCString()};SameSite=None;Secure`;
};

export const getCookieValueFromString = (name: string, cookie?: string): string => {
  if (cookie) {
    const match = cookie.match(`${name}=([^;]*)`);
    if (match?.length && match?.length > 1) {
      return match[1];
    }
  }
  return '';
};
