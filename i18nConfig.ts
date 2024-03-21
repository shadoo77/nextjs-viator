import { type Config } from 'next-i18n-router/dist/types';

export const fallbackLng = 'en';

export const locales = [fallbackLng, 'nl'];

export type Locale = typeof fallbackLng | 'nl';

const i18nConfig: Config = {
  locales,
  defaultLocale: fallbackLng,
  prefixDefault: true
};

export default i18nConfig;
