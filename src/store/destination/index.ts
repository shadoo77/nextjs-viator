'use client';

import { create } from 'zustand';
import { Destination } from '@/types/destinations';

interface DestinationState {
  destination: Destination | null;
}

interface DestinationStore extends DestinationState {
  setDestination: (destination: Destination) => void;
  resetState: () => void;
}

const initialState: DestinationState = {
  destination: null
};

export const useDestinationStore = create<DestinationStore>((set) => ({
  ...initialState,
  setDestination: (destination: Destination) => set({ destination }),
  resetState: () => set(initialState)
}));
