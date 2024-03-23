'use client';

import { useTranslation } from 'react-i18next';
import { LuDollarSign, LuTicket, LuMapPin, LuCalendarClock } from 'react-icons/lu';
import { useEffect } from 'react';
import axios from 'axios';
import FeatureItem from '@/components/molecules/FeatureItem';
import { useAttractions } from '@/tanstack/queries/attractions';
import { Locale } from '@/i18nConfig';

const items = [
  {
    Icon: LuTicket,
    titleKey: 'homePage.featureSection.feature1.title',
    descriptionKey: 'homePage.featureSection.feature1.description'
  },
  {
    Icon: LuMapPin,
    titleKey: 'homePage.featureSection.feature2.title',
    descriptionKey: 'homePage.featureSection.feature2.description'
  },
  {
    Icon: LuDollarSign,
    titleKey: 'homePage.featureSection.feature3.title',
    descriptionKey: 'homePage.featureSection.feature3.description'
  },
  {
    Icon: LuCalendarClock,
    titleKey: 'homePage.featureSection.feature4.title',
    descriptionKey: 'homePage.featureSection.feature4.description'
  }
];

export default function FeatureSection() {
  const { t, i18n } = useTranslation();
  const { data, isPending, error, mutate } = useAttractions(i18n.language as Locale);

  useEffect(() => {
    mutate(i18n.language as Locale);
  }, [i18n.language, mutate]);

  console.log({ data, isPending, error });

  return (
    <section className="py-4">
      <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">
        {t('homePage.featureSection.title')}
      </h2>
      <div className="container px-6 m-auto">
        <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
          {items.map(({ titleKey, descriptionKey, Icon }, index) => (
            <div className="col-span-4 lg:col-span-3" key={index}>
              <FeatureItem title={t(titleKey)} description={t(descriptionKey)} Icon={Icon} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
