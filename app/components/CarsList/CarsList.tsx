"use client";

import { Car } from "@/app/lib/api";
import Link from "next/link";
import Image from "next/image";
import { useCarStore } from "@/app/lib/store/carStore";
import css from "./CarsList.module.css";

export default function CarsList() {
  const cars = useCarStore((s) => s.cars);
  const page = useCarStore((s) => s.page);
  const totalPages = useCarStore((s) => s.totalPages);
  const isLoading = useCarStore((s) => s.isLoading);
  const loadMore = useCarStore((s) => s.loadMore);

  const hasMore = page < totalPages;

  return (
    <div className={css.container}>
      <ul className={css.cars_list}>
        {cars.map((car: Car) => (
          <li key={car.id}>
            <Image
              src={car.img}
              alt={car.model}
              width={276}
              height={268}
              style={{ borderRadius: "12px" }}
            />
            <div className={css.name_car_container}>
              <p>
                {car.brand} <span className={css.span_model}> {car.model}</span>
                , {car.year}
              </p>
              <p>${car.rentalPrice}</p>
            </div>

            <p className={`${css.carsList_text_top} ${css.carsList_text}`}>
              {`${car.address.split(", ")[1]} | ${car.address
                .split(", ")
                .slice(2)
                .join(", ")} | ${car.rentalCompany}`}
            </p>
            <p className={`${css.carsList_text_bottom} ${css.carsList_text}`}>
              {`${car.type} | ${car.mileage
                .toLocaleString("en-US")
                .replace(/,/g, " ")} km`}
            </p>
            <Link className={css.readMore_btn} href={`/catalog/${car.id}`}>
              Read more
            </Link>
          </li>
        ))}
      </ul>

      <div>
        {/* <p>
          Showing page {page} of {totalPages} ({cars.length} cars total)
        </p> */}

        {hasMore && (
          <button
            className={css.load_more}
            onClick={loadMore}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        )}

        {!hasMore && cars.length > 0 && <p>No more cars to load</p>}
      </div>
    </div>
  );
}
