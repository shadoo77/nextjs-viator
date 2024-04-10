import type { Image } from '@/types/products';

export interface ProductDetails {
  status: 'INACTIVE' | 'ACTIVE';
  productCode: string;
  language: string;
  createdAt: string;
  lastUpdatedAt: string;
  title: string;
  ticketInfo: TicketInfo;
  pricingInfo: PricingInfo;
  images: Image[];
  logistics: Logistics;
  timeZone: string;
  description: string;
  inclusions: InclusionExclusion[];
  exclusions: InclusionExclusion[];
  additionalInfo: AdditionalInfo[];
  cancellationPolicy: CancellationPolicy;
  bookingConfirmationSettings: BookingConfirmationSettings;
  bookingRequirements: BookingRequirements;
  languageGuides: LanguageGuide[];
  bookingQuestions: string[];
  tags: number[];
  destinations: Destination[];
  itinerary: Itinerary;
  productOptions: ProductOption[];
  translationInfo: TranslationInfo;
  supplier: Supplier;
  productUrl: string;
  reviews: Reviews;
}

export interface TicketInfo {
  ticketTypes: ('MOBILE_ONLY' | 'PAPER')[];
  ticketTypeDescription: string;
  ticketsPerBooking: 'ONE_PER_BOOKING' | 'ONE_PER_TRAVELER';
  ticketsPerBookingDescription: string;
}

export interface PricingInfo {
  type: 'PER_PERSON' | 'UNIT';
  ageBands: ('ADULT' | 'SENIOR' | 'YOUTH' | 'CHILD' | 'INFANT' | 'TRAVELER')[];
  unitType?: 'BIKE' | 'BOAT' | 'GROUP' | 'PACKAGE' | 'ROOM' | 'VEHICLE' | 'AIRCRAFT';
}

export interface AgeBand {
  ageBand: string;
  startAge: number;
  endAge: number;
  minTravelersPerBooking: number;
  maxTravelersPerBooking: number;
}

export type LogisticsLocation = {
  location: Location;
  description: string;
};

export interface Logistics {
  start: LogisticsLocation[];
  end: LogisticsLocation[];
  redemption: Redemption;
  travelerPickup: TravelerPickup;
}

export interface Location {
  ref: string;
}

export interface Redemption {
  redemptionType: 'NONE' | 'ATTRACTION_START_POINT' | 'DIFFERENT_LOCATION' | 'INDIRECT_DELIVERY';
  specialInstructions: string;
}

export interface TravelerPickup {
  pickupOptionType:
    | 'PICKUP_EVERYONE'
    | 'PICKUP_AND_MEET_AT_START_POINT'
    | 'MEET_EVERYONE_AT_START_POINT';
  allowCustomTravelerPickup: boolean;
  locations: {
    location: Location;
    pickupType: 'AIRPORT' | 'HOTEL' | 'PORT' | 'LOCATION' | 'OTHER';
  }[];
  minutesBeforeDepartureTimeForPickup: number;
  additionalInfo: string;
}

export interface InclusionExclusion {
  category:
    | 'EQUIPMENT'
    | 'FOOD_AND_DRINK'
    | 'TRANSPORT_AMENITIES'
    | 'FEES_AND_TAXES'
    | 'SOUVENIRS'
    | 'OTHER';
  categoryDescription: string;
  type:
    | 'FUEL_SURCHARGE'
    | 'LANDING_AND_FACILITY_FEES'
    | 'AIRPORT_AND_DEPARTURE_TAX'
    | 'GST'
    | 'GRATUITIES'
    | 'PARKING_FEES'
    | 'ALL_FEES_AND_TAXES'
    | 'USE_OF_BICYCLE'
    | 'USE_OF_SCUBA_EQUIPMENT'
    | 'USE_OF_SNORKELING_EQUIPMENT'
    | 'USE_OF_TRIKKE'
    | 'USE_OF_SEGWAY'
    | 'USE_OF_OTHER_EQUIPMENT'
    | 'USE_OF_COOKING_UTENSILS'
    | 'ALL_INGREDIENTS'
    | 'BREAKFAST'
    | 'LUNCH'
    | 'DINNER'
    | 'SNACKS'
    | 'BOTTLED_WATER'
    | 'COFFEE_AND_TEA'
    | 'SODA_POP'
    | 'ALCOHOLIC_BEVERAGES'
    | 'REFRESHMENTS'
    | 'AIR_CONDITIONED_VEHICLE'
    | 'RESTROOM_ON_BOARD'
    | 'PRIVATE_TRANSPORTATION'
    | 'WIFI_ONBOARD'
    | 'CERTIFICATE'
    | 'RECIPE_BOOKLET'
    | 'OTHER';
  typeDescription: string;
  otherDescription: string;
  quantity?: number;
  description?: string;
}

export interface AdditionalInfo {
  type:
    | 'OTHER'
    | 'WHEELCHAIR_ACCESSIBLE'
    | 'NOT_WHEELCHAIR_ACCESSIBLE'
    | 'STROLLER_ACCESSIBLE'
    | 'PETS_WELCOME'
    | 'PUBLIC_TRANSPORTATION_NEARBY'
    | 'INFANTS_MUST_SIT_ON_LAPS'
    | 'INFANT_SEATS_AVAILABLE'
    | 'TRANSPORTATION_WHEELCHAIR_ACCESSIBLE'
    | 'SURFACES_WHEELCHAIR_ACCESSIBLE'
    | 'NO_BACK_PROBLEMS'
    | 'NO_PREGNANT'
    | 'NO_HEART_PROBLEMS'
    | 'HEALTH_OTHER'
    | 'PHYSICAL_EASY'
    | 'PHYSICAL_MEDIUM'
    | 'PHYSICAL_HARD';
  description:
    | 'SAFETY_OTHER'
    | 'SAFETY_FACE_MASKS_REQUIRED_FOR_TRAVELERS_IN_PUBLIC_AREAS'
    | 'SAFETY_FACE_MASKS_REQUIRED_FOR_GUIDES_IN_PUBLIC_AREAS'
    | 'SAFETY_FACE_MASKS_PROVIDED_FOR_TRAVELERS'
    | 'SAFETY_HAND_SANITIZER_AVAILABLE_TO_TRAVELERS_AND_STAFF'
    | 'SAFETY_SOCIAL_DISTANCING_ENFORCED_THROUGHOUT_EXPERIENCE'
    | 'SAFETY_REGULARLY_SANITIZED_HIGH_TRAFFIC_AREAS'
    | 'SAFETY_GEAR_EQUIPMENT_SANITIZED_BETWEEN_USE'
    | 'SAFETY_TRANSPORTATION_VEHICLES_REGULARLY_SANITIZED'
    | 'SAFETY_GUIDES_REQUIRED_TO_REGULARLY_WASH_HANDS'
    | 'SAFETY_REGULAR_TEMPERATURE_CHECKS_FOR_STAFF'
    | 'SAFETY_TEMPERATURE_CHECKS_FOR_TRAVELERS_UPON_ARRIVAL'
    | 'SAFETY_PAID_STAY_AT_HOME_POLICY_FOR_STAFF_WITH_SYMPTOMS'
    | 'SAFETY_CONTACTLESS_PAYMENTS_FOR_GRATUITIES_AND_ADD_ONS'
    | 'SAFETY_COVID_19_VACCINATION_REQUIRED_FOR_GUIDES'
    | 'SAFETY_PROOF_OF_COVID_19_VACCINATION_REQUIRED_FOR_TRAVELERS';
}

export interface CancellationPolicy {
  type: 'STANDARD' | 'ALL_SALES_FINAL' | 'CUSTOM';
  description: string;
  cancelIfBadWeather: boolean;
  cancelIfInsufficientTravelers: boolean;
  refundEligibility: RefundEligibility[];
}

export interface RefundEligibility {
  dayRangeMin: number;
  dayRangeMax?: number;
  percentageRefundable: number;
  startTimestamp?: string;
  endTimestamp?: string;
}

export interface BookingConfirmationSettings {
  bookingCutoffType: 'OPENING_TIME' | 'FIXED_TIME' | 'CLOSING_TIME' | 'START_TIME';
  bookingCutoffInMinutes: number;
  confirmationType: 'INSTANT' | 'MANUAL' | 'INSTANT_THEN_MANUAL';
  manualConfirmationPeriod?: number;
  bookingCutoffFixedTime: string;
}

export interface BookingRequirements {
  minTravelersPerBooking: number;
  maxTravelersPerBooking: number;
  requiresAdultForBooking: boolean;
}

export interface LanguageGuide {
  type: 'GUIDE' | 'AUDIO' | 'WRITTEN';
  language: string;
  legacyGuide: string;
}

export interface Destination {
  ref: string;
  primary: boolean;
}

export interface Itinerary {
  itineraryType: 'STANDARD' | 'ACTIVITY' | 'MULTI_DAY_TOUR' | 'HOP_ON_HOP_OFF' | 'UNSTRUCTURED';
  skipTheLine: boolean;
  privateTour: boolean;
  duration?: Duration;
  maxTravelersInSharedTour?: number;
  unstructuredDescription?: string;
  itineraryItems: Item[];
}

export interface Day {
  title: string;
  dayNumber: number;
  items: Item[];
  accommodations?: {
    description: string;
  }[];
}

export interface Item {
  pointOfInterestLocation: PointOfInterestLocation;
  duration: Duration;
  passByWithoutStopping: boolean;
  admissionIncluded: 'YES' | 'NO' | 'NOT_APPLICABLE';
  description: string;
}

export interface PointOfInterestLocation {
  location: Location;
  attractionId?: number;
}

export interface Duration {
  fixedDurationInMinutes?: number;
  variableDurationFromMinutes?: number;
  variableDurationToMinutes?: number;
  unstructuredDuration?: string;
}

export interface ProductOption {
  productOptionCode: string;
  description?: string;
  title: string;
  languageGuides: LanguageGuide[];
}

export interface TranslationInfo {
  containsMachineTranslatedText: boolean;
  translationSource: 'MACHINE' | 'ORIGINAL' | 'MANUAL';
  translationAttribution?: string;
}

export interface Supplier {
  name: string;
  reference: string;
}

export interface Reviews {
  sources: Source[];
  reviewCountTotals?: ReviewCount[];
  totalReviews: number;
  combinedAverageRating: number;
}

export type ReviewCount = {
  rating: number;
  count: number;
};

export interface Source {
  provider: 'VIATOR' | 'TRIPADVISOR';
  reviewCounts?: ReviewCount[];
  totalCount: number;
  averageRating: number;
}
