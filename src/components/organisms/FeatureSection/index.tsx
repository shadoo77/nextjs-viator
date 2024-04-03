'use client';

import { useTranslation } from 'react-i18next';
import { LuDollarSign, LuTicket, LuMapPin, LuCalendarClock } from 'react-icons/lu';
import FeatureItem from '@/components/molecules/FeatureItem';
import SectionWithTitle from '@/components/templates/SectionWithTitle';

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
  const { t } = useTranslation();

  return (
    <SectionWithTitle title={t('homePage.featureSection.title')}>
      <div className="grid gap-6 grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
        {items.map(({ titleKey, descriptionKey, Icon }, index) => (
          <div className="col-span-4 lg:col-span-3" key={index}>
            <FeatureItem title={t(titleKey)} description={t(descriptionKey)} Icon={Icon} />
          </div>
        ))}
      </div>
    </SectionWithTitle>
  );
}
