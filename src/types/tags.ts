export type Tag = {
  tagId: number;
  parentTagIds?: number[];
  allNamesByLocale: AllNamesByLocale;
};

export type AllNamesByLocale = {
  de: string;
  no: string;
  sv: string;
  pt: string;
  ko: string;
  en_AU: string;
  en: string;
  it: string;
  fr: string;
  en_UK: string;
  es: string;
  zh: string;
  zh_HK: string;
  zh_TW: string;
  ja: string;
  zh_CN: string;
  da: string;
  nl: string;
};
