import { create } from 'zustand';
import { FilterState } from '@/types';

interface FilterStoreState extends FilterState {
  setCategory: (category?: string) => void;
  setSpace: (space?: string) => void;
  setCollection: (collection?: string) => void;
  setMaterial: (material?: string) => void;
  setFrameMaterial: (frameMaterial?: string) => void;
  setWeatherResistance: (weatherResistance?: string) => void;
  setPriceRange: (min?: number, max?: number) => void;
  setInStockOnly: (inStockOnly: boolean) => void;
  setSortBy: (sortBy: FilterState['sortBy']) => void;
  setSearchQuery: (query?: string) => void;
  resetFilters: () => void;
}

const initialFilters: FilterState = {
  category: undefined,
  space: undefined,
  collection: undefined,
  material: undefined,
  frameMaterial: undefined,
  weatherResistance: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  inStockOnly: false,
  sortBy: 'featured',
  searchQuery: undefined,
};

export const useFilterStore = create<FilterStoreState>((set) => ({
  ...initialFilters,
  setCategory: (category) => set({ category }),
  setSpace: (space) => set({ space }),
  setCollection: (collection) => set({ collection }),
  setMaterial: (material) => set({ material }),
  setFrameMaterial: (frameMaterial) => set({ frameMaterial }),
  setWeatherResistance: (weatherResistance) => set({ weatherResistance }),
  setPriceRange: (minPrice, maxPrice) => set({ minPrice, maxPrice }),
  setInStockOnly: (inStockOnly) => set({ inStockOnly }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  resetFilters: () => set({ ...initialFilters }),
}));
