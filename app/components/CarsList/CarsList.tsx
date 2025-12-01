"use client";

import { Car } from "@/app/lib/api";
import Link from "next/link";
import Image from "next/image";
import { useCarStore } from "@/app/lib/store/carStore";
import css from "./CarsList.module.css";
import { useEffect, useState } from "react";

export default function CarsList() {
  const cars = useCarStore((s) => s.cars);
  const page = useCarStore((s) => s.page);
  const totalPages = useCarStore((s) => s.totalPages);
  const isLoading = useCarStore((s) => s.isLoading);
  const loadMore = useCarStore((s) => s.loadMore);

  const hasMore = page < totalPages;
  const [favorites, setFavorites] = useState<Car[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favoriteCars") || "[]");
    setFavorites(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteCars", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (car: Car) => {
    setFavorites((prev: Car[]) => {
      const exists = prev.some((item) => item.id === car.id);
      return exists
        ? prev.filter((item) => item.id !== car.id)
        : [...prev, car];
    });
  };

  return (
    <div className={css.container}>
      <ul className={css.cars_list}>
        {cars.map((car: Car) => {
          const isFavorite = favorites.some((item) => item.id === car.id);

          return (
            <li key={car.id}>
              <div className={css.image_wrap}>
                <Image
                  src={car.img}
                  alt={car.model}
                  width={276}
                  height={268}
                  className={css.image}
                  style={{ borderRadius: "12px" }}
                />

                <button
                  className={css.icon_button}
                  onClick={() => toggleFavorite(car)}
                  aria-label="Add to favorites"
                >
                  {isFavorite ? (
                    <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                      <path
                        d="M16 28c-.3 0-.6-.1-.8-.3C8.5 22.2 1.3 15.7 1.3 9.1c0-4.8 3.9-8.8 8.8-8.8 2.5 0 4.9 1.1 6.5 2.9 1.6-1.8 4-2.9 6.5-2.9 4.8 0 8.8 3.9 8.8 8.8 0 6.6-7.2 13.1-13.9 18.6-.2.2-.5.3-.8.3z"
                        fill="#3470FF"
                      />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                      <path
                        d="m16 5.496-1.434-1.474C11.2.562 5.028 1.756 2.8 6.106c-1.046 2.046-1.282 5 .628 8.77C5.268 18.506 9.096 22.854 16 27.59c6.904-4.736 10.73-9.084 12.572-12.714 1.91-3.772 1.676-6.724.628-8.77C26.972 1.756 20.8.56 17.434 4.02L16 5.496zM16 30C-14.666 9.736 6.558-6.08 15.648 2.286c.12.111.237.225.352.342a5.94 5.94 0 0 1 .352-.34C25.44-6.084 46.666 9.734 16 30z"
                        fill="rgba(255, 255, 255, 0.8)"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div className={css.name_car_container}>
                <p>
                  {car.brand}{" "}
                  <span className={css.span_model}> {car.model}</span>,{" "}
                  {car.year}
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
          );
        })}
      </ul>

      <div>
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
