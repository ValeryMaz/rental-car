import { create } from "zustand";
import type { Car, Filters } from "@/app/lib/api";
import { getFilteredCars } from "@/app/lib/api";

type CarStore = {
  cars: Car[];
  filters: Filters;
  page: number;
  totalPages: number;
  isLoading: boolean;

  setBrand: (b: string) => void;
  setPrice: (p: number) => void;
  setMileageFrom: (v: number) => void;
  setMileageTo: (v: number) => void;

  setInitialCars: (data: {
    cars: Car[];
    page: number;
    totalPages: number;
  }) => void;

  searchCars: () => Promise<void>;
  loadMore: () => Promise<void>;
  resetFilters: () => void;
};

const initialFilters: Filters = {
  brand: "",
  price: null,
  mileageFrom: null,
  mileageTo: null,
};

export const useCarStore = create<CarStore>((set, get) => ({
  cars: [],
  page: 1,
  totalPages: 1,
  isLoading: false,
  filters: initialFilters,

  setInitialCars: (data) => {
    set({
      cars: data.cars,
      page: 1,
      totalPages: Number(data.totalPages),
    });
  },

  setBrand: (brand) =>
    set((state) => ({ filters: { ...state.filters, brand } })),

  setPrice: (price) =>
    set((state) => ({ filters: { ...state.filters, price } })),

  setMileageFrom: (v) =>
    set((state) => ({ filters: { ...state.filters, mileageFrom: v } })),

  setMileageTo: (v) =>
    set((state) => ({ filters: { ...state.filters, mileageTo: v } })),

  resetFilters: () =>
    set({
      filters: initialFilters,
    }),

  searchCars: async () => {
    const { filters } = get();

    set({ isLoading: true });

    try {
      const res = await getFilteredCars(1, filters);

      set({
        cars: res.cars,
        page: 1,
        totalPages: Number(res.totalPages),
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  loadMore: async () => {
    const { page, totalPages, cars, filters, isLoading } = get();

    if (isLoading) {
      return;
    }

    if (page >= totalPages) {
      return;
    }
    const nextPage = page + 1;

    set({ isLoading: true });

    try {
      const res = await getFilteredCars(nextPage, filters);

      set({
        cars: [...cars, ...res.cars],
        page: nextPage,
        totalPages: Number(res.totalPages),
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
    }
  },
}));
