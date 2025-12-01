"use client";

import { useCarStore } from "@/app/lib/store/carStore";
import css from "./CarFilterPanel.module.css";

type Props = {
  brands: string[];
  prices: number[];
  minMileage: number;
  maxMileage: number;
};

export default function CarFilterPanel({
  brands,
  prices,
  minMileage,
  maxMileage,
}: Props) {
  const setBrand = useCarStore((s) => s.setBrand);
  const setPrice = useCarStore((s) => s.setPrice);
  const setMileageFrom = useCarStore((s) => s.setMileageFrom);
  const setMileageTo = useCarStore((s) => s.setMileageTo);
  const searchCars = useCarStore((s) => s.searchCars);

  return (
    <div className={css.container}>
      <form className={css.form}>
        <div className={css.select_wrapper}>
          <label className={`${css.label_text}`} htmlFor="car-select">
            Car brand
          </label>
          <select
            className={css.select}
            id="car-select"
            defaultValue=""
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="" disabled hidden>
              Choose a brand
            </option>

            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className={css.select_wrapper}>
          <label className={`${css.label_text}`} htmlFor="price-select">
            Price / 1 hour
          </label>
          <select
            className={css.select}
            id="price-select"
            defaultValue=""
            onChange={(e) => setPrice(Number(e.target.value))}
          >
            <option value="" disabled hidden>
              Choose a price
            </option>
            {prices.map((price) => (
              <option key={price} value={price}>
                {price}
              </option>
            ))}
          </select>
        </div>

        <div className={css.mileage}>
          <label className={`${css.label_text}`}>Car mileage / km</label>
          <div className={css.input_wrapper}>
            <div className={css.input_cover}>
              <span className={css.input_label}>From</span>
              <input
                type="number"
                name="mileageFrom"
                onChange={(e) => setMileageFrom(Number(e.target.value))}
              />
            </div>
            <div className={css.input_cover}>
              <span className={css.input_label}>To</span>
              <input
                type="number"
                name="mileageTo"
                onChange={(e) => setMileageTo(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <button className={css.search_btn} type="button" onClick={searchCars}>
          Search
        </button>
      </form>
    </div>
  );
}
