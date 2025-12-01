"use client";

import { useEffect } from "react";
import { useCarStore } from "../../lib/store/carStore";
import CarsFilter from "../CarsFilter/CarsFilter";
import CarsList from "../CarsList/CarsList";
import type { Car } from "@/app/lib/api";
import css from "./CatalogWrapper.module.css";

interface CatalogViewProps {
  initialCars: Car[];
  initialPage: number;
  initialTotalPages: number;
}

export default function CatalogWrapper({
  initialCars,
  initialPage,
  initialTotalPages,
}: CatalogViewProps) {
  const setInitialCars = useCarStore((s) => s.setInitialCars);

  useEffect(() => {
    setInitialCars({
      cars: initialCars,
      page: initialPage,
      totalPages: initialTotalPages,
    });
  }, []);

  return (
    <div>
      <CarsFilter />
      <CarsList />
    </div>
  );
}
