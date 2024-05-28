import { resizedBaseImageURL } from '@/lib/utils';

export const popularDestinations = [
  {
    destinationName: 'Paris',
    imageUrl: `${resizedBaseImageURL(400, 300)}/v1711384529/populaire destinations/Paris.jpg`,
    destinationId: 479,
    translationKey: 'destinations.paris'
  },
  {
    destinationName: 'Rome',
    imageUrl: `${resizedBaseImageURL(400, 300)}/v1711384477/populaire destinations/Rome.jpg`,
    destinationId: 511,
    translationKey: 'destinations.rome'
  },
  {
    destinationName: 'New York',
    imageUrl: `${resizedBaseImageURL(400, 300)}/v1711384023/populaire destinations/New York.jpg`,
    destinationId: 5560,
    translationKey: 'destinations.newYork'
  },
  {
    destinationName: 'London',
    imageUrl: `${resizedBaseImageURL(400, 300)}/v1711384142/populaire destinations/London.jpg`,
    destinationId: 737,
    translationKey: 'destinations.london'
  },
  {
    destinationName: 'Barcelona',
    imageUrl: `${resizedBaseImageURL(400, 300)}/v1711384586/populaire destinations/Barcelona.jpg`,
    destinationId: 562,
    translationKey: 'destinations.barcelona'
  },
  {
    destinationName: 'Tokyo',
    imageUrl: `${resizedBaseImageURL(400, 300)}/v1711384674/populaire destinations/Tokyo.jpg`,
    destinationId: 334,
    translationKey: 'destinations.tokyo'
  },
  {
    destinationName: 'Venice',
    imageUrl: `${resizedBaseImageURL(400, 300)}/v1711384729/populaire destinations/Venice.jpg`,
    destinationId: 522,
    translationKey: 'destinations.venice'
  },
  {
    destinationName: 'Amsterdam',
    imageUrl: `${resizedBaseImageURL(400, 300)}/v1711384812/populaire destinations/Amsterdam.jpg`,
    destinationId: 525,
    translationKey: 'destinations.amsterdam'
  },
  {
    destinationName: 'Dubai',
    imageUrl: `${resizedBaseImageURL(400, 300)}/v1711385106/populaire destinations/Dubai.jpg`,
    destinationId: 828,
    translationKey: 'destinations.dubai'
  },
  {
    destinationName: 'Istanbul',
    imageUrl: `${resizedBaseImageURL(400, 300)}/v1711385049/populaire destinations/Istanbul.jpg`,
    destinationId: 585,
    translationKey: 'destinations.istanbul'
  },
  {
    destinationName: 'Sydney',
    imageUrl: `${resizedBaseImageURL(400, 300)}/v1711385154/populaire destinations/Sydney.png`,
    destinationId: 357,
    translationKey: 'destinations.sydney'
  },
  {
    destinationName: 'Bangkok',
    imageUrl: `${resizedBaseImageURL(400, 300)}/v1711385232/populaire destinations/Bangkok.jpg`,
    destinationId: 343,
    translationKey: 'destinations.bangkok'
  },
  {
    destinationName: 'Los Angeles',
    imageUrl: `${resizedBaseImageURL(400, 300)}/v1711385411/populaire destinations/Los Angeles.jpg`,
    destinationId: 645,
    translationKey: 'destinations.losAngeles'
  },
  {
    destinationName: 'Miami',
    imageUrl: `${resizedBaseImageURL(400, 300)}/v1711385332/populaire destinations/Miami.jpg`,
    destinationId: 662,
    translationKey: 'destinations.miami'
  }
];

export const appStorage = Object.freeze({
  currency: 'TripPlazr--currency'
});

export const toursPageCount = 16;
export const currencyFallback = 'EUR';

export const durationOptions = [
  { label: 'upTo1Hour', to: 60 },
  { label: '1To4Hours', from: 60, to: 240 },
  { label: '4HoursTo1Day', from: 240, to: 1440 },
  { label: '1To3Days', from: 1440, to: 4320 },
  { label: '+3Days', from: 4320 }
];

export const ratingOptions = ['5', '4', '3'];
