'use client';

import { create } from 'zustand';
import { Destination } from '@/types/destinations';

type Location = {
  city: string;
  region: string;
  country: string;
};

interface DestinationState {
  destination: Destination | null;
  location: {
    city: string;
    region: string;
    country: string;
  };
}

interface DestinationStore extends DestinationState {
  setDestination: (destination: Destination) => void;
  setLocation: (location: Location) => void;
  resetState: () => void;
}

const initialState: DestinationState = {
  destination: null,
  location: {
    city: '',
    region: '',
    country: ''
  }
};

export const useDestinationStore = create<DestinationStore>((set) => ({
  ...initialState,
  setDestination: (destination: Destination) => set({ destination }),
  setLocation: (location: Location) => set({ location }),
  resetState: () => set(initialState)
}));
