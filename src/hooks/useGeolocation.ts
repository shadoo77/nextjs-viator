'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type GeolocationCoordinates = InstanceType<typeof window.GeolocationCoordinates>;
type GeolocationPosition = InstanceType<typeof window.GeolocationPosition>;
type GeolocationPositionError = InstanceType<typeof window.GeolocationPositionError>;

export function useGeolocation() {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setLocation(position.coords);
    };

    const handleError = (error: GeolocationPositionError) => {
      setError(t(`geolocationError.${error.code}`));
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, [t]);

  return { location, error };
}
