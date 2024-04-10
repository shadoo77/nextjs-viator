'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { pluralize } from '@/lib/utils';
import { Duration } from '@/types/products';

export function useDuration({ duration }: { duration: Duration | undefined }) {
  const { t } = useTranslation();
  const [durationText, setDurationText] = useState<string>('');

  useEffect(() => {
    if (duration?.fixedDurationInMinutes) {
      const hours = Math.floor(duration.fixedDurationInMinutes / 60);
      const minutes = duration.fixedDurationInMinutes % 60;
      const hoursText = pluralize(hours, t('hour'), t('hours'));
      const minutesText = pluralize(minutes, t('minute'), t('minutes'));
      let txt = '';
      if (hours > 0) txt += hoursText;
      if (minutes > 0) txt += hours ? `${t('comma')} ${minutesText}` : minutesText;
      setDurationText(txt);
    }

    if (duration?.variableDurationFromMinutes && duration?.variableDurationToMinutes) {
      const hoursFrom = Math.floor(duration.variableDurationFromMinutes / 60);
      const minutesFrom = duration.variableDurationFromMinutes % 60;
      const hoursTo = Math.floor(duration.variableDurationToMinutes / 60);
      const minutesTo = duration.variableDurationToMinutes % 60;

      const hoursFromText = pluralize(hoursFrom, t('hour'), t('hours'));
      const minutesFromText = pluralize(minutesFrom, t('minute'), t('minutes'));
      const hoursToText = pluralize(hoursTo, t('hour'), t('hours'));
      const minutesToText = pluralize(minutesTo, t('minute'), t('minutes'));

      let fromTxt = '';
      if (hoursFrom > 0) fromTxt += hoursFromText;
      if (minutesFrom > 0)
        fromTxt += hoursFrom ? `${t('comma')} ${minutesFromText}` : minutesFromText;

      let toTxt = '';
      if (hoursTo > 0) toTxt += hoursToText;
      if (minutesTo > 0) toTxt += hoursTo ? `${t('comma')} ${minutesToText}` : minutesToText;

      let durationTxt = `${fromTxt} ${t('toUntil')} ${toTxt}`.toLowerCase();

      const arr1 = fromTxt.split(' ');
      const arr2 = toTxt.split(' ');

      if (arr1.length === 2 && arr2.length === 2 && arr1[1] === arr2[1]) {
        durationTxt = `${arr1[0]} ${t('toUntil')} ${arr2[0]} ${arr1[1]}`.toLowerCase();
      }

      setDurationText(durationTxt);
    }
  }, [duration, t]);

  if (!duration) return durationText;

  return durationText;
}
