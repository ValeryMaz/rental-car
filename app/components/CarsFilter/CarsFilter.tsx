"use client";

import { getBrandList, getCars } from "@/app/lib/api";
import CarFilterPanel from "../CarFilterPanel/CarFilterPanel";
import { useEffect, useState } from "react";

export default function CarFilter() {
  const [brands, setBrands] = useState<string[]>([]);
  const [prices, setPrices] = useState<number[]>([]);
  const [minMileage, setMinMileage] = useState(0);
  const [maxMileage, setMaxMileage] = useState(0);

  useEffect(() => {
    async function load() {
      const brand = await getBrandList();
      const data = await getCars();

      const pricesArr = [
        ...new Set(data.cars.map((c) => Number(c.rentalPrice))),
      ].sort((a, b) => a - b);
      const mileages = data.cars.map((c) => c.mileage);

      setBrands(brand);
      setPrices(pricesArr);
      setMinMileage(Math.min(...mileages));
      setMaxMileage(Math.max(...mileages));
    }

    load();
  }, []);

  return (
    <CarFilterPanel
      brands={brands}
      prices={prices}
      minMileage={minMileage}
      maxMileage={maxMileage}
    />
  );
}
