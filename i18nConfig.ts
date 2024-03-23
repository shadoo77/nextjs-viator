import { type Config } from 'next-i18n-router/dist/types';

export const fallbackLng = 'en';

export type Locale = typeof fallbackLng | 'nl';

export const locales: Locale[] = [fallbackLng, 'nl'];

const i18nConfig: Config = {
  locales,
  defaultLocale: fallbackLng,
  prefixDefault: true
};

export default i18nConfig;
