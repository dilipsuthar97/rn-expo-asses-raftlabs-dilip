import { Property } from '@/types/Property';
import { create } from 'zustand';

interface PropertiesState {
  properties: Property[];
  setProperties: (properties: Property[]) => void;
}

export const usePropertiesStore = create<PropertiesState>(set => ({
  properties: [],
  setProperties: properties => set(state => ({ properties: [...state.properties, ...properties] })),
}));
