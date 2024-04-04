export type Destination = {
  sortOrder: number;
  selectable: boolean;
  destinationUrlName: string;
  defaultCurrencyCode: string;
  lookupId: string;
  parentId: number;
  timeZone: string;
  iataCode: string;
  destinationName: string;
  destinationId: number;
  destinationType: 'COUNTRY' | 'REGION' | 'CITY' | string;
  latitude: number;
  longitude: number;
};

export type DestinationResponse = {
  errorReference: any;
  data: Destination[];
  dateStamp: string;
  errorType: any;
  errorCodes: any[];
  errorMessage: any;
  errorName: any;
  extraInfo: object;
  extraObject: any;
  success: boolean;
  totalCount: number;
  errorMessageText: any;
  vmid: string;
};

export type Coordinates = { latitude: number; longitude: number };
