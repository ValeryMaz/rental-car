// lib/api.ts
import axios from "axios";

export type Car = {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
};

export type CarsListResponse = {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
};

export type Filters = {
  brand?: string;
  price?: number | null;
  mileageFrom?: number | null;
  mileageTo?: number | null;
};

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const getCars = async (page: number = 1): Promise<CarsListResponse> => {
  const res = await axios.get<CarsListResponse>("/cars", {
    params: {
      page,
      limit: 12,
    },
  });

  return {
    ...res.data,
    page: Number(res.data.page),
    totalPages: Number(res.data.totalPages),
  };
};

export const getSingleCar = async (id: string): Promise<Car> => {
  const res = await axios.get<Car>(`/cars/${id}`);
  return res.data;
};

export const getBrandList = async (): Promise<string[]> => {
  const res = await axios.get<string[]>(`/brands`);
  return res.data;
};

export async function getFilteredCars(
  page: number = 1,
  filters: Filters = {}
): Promise<CarsListResponse> {
  const params: Record<string, string | number> = {
    page: page,
    limit: 12,
  };

  if (filters.brand) {
    params.brand = filters.brand;
  }

  if (filters.price) {
    params.rentalPrice = filters.price;
  }

  if (filters.mileageFrom) {
    params.minMileage = filters.mileageFrom;
  }

  if (filters.mileageTo) {
    params.maxMileage = filters.mileageTo;
  }

  try {
    const res = await axios.get<CarsListResponse>("/cars", { params });

    const normalizedData = {
      ...res.data,
      page: Number(res.data.page),
      totalPages: Number(res.data.totalPages),
    };

    return normalizedData;
  } catch (error) {
    throw error;
  }
}
