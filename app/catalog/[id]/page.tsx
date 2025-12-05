import CarRentForm from "@/app/components/CarRentForm/CarRentForm";
import { getSingleCar } from "@/app/lib/api";
import Image from "next/image";
import css from "./page.module.css";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CarPage({ params }: Props) {
  const { id } = await params;
  const car = await getSingleCar(id);
  const [street, city, country] = car.address.split(", ");

  return (
    <div className={css.container}>
      <div className={css.container_left}>
        <Image
          src={car.img}
          alt={car.model}
          width={640}
          height={512}
          style={{ borderRadius: "18px" }}
        />
        <CarRentForm />
      </div>

      <div className={css.container_right}>
        <p className={css.car_title}>
          {car.brand} <span className={css.model_span}>{car.model}</span>,{" "}
          {car.year}
        </p>

        <p className={css.car_address}>
          <svg width="16" height="16">
            <use href="/sprite.svg#icon-Location"></use>
          </svg>
          {`${city}, ${country} \u2009 Mileage ${car.mileage
            .toLocaleString("en-US")
            .replace(/,/g, " ")} km`}
        </p>

        <p className={css.car_price}>${car.rentalPrice}</p>

        <p className={css.car_description}>{car.description}</p>

        <div className={css.right_block}>
          <h3 className={css.block_title}>Rental Conditions:</h3>
          <ul className={css.block_list}>
            {car.rentalConditions.map((cond) => (
              <li key={cond}>
                <svg width="16" height="16">
                  <use href="/sprite.svg#icon-check-circle"></use>
                </svg>
                {cond}
              </li>
            ))}
          </ul>
        </div>

        <div className={css.right_block}>
          <h3 className={css.block_title}>Car Specifications:</h3>
          <ul className={css.block_list}>
            <li>
              <svg width="16" height="16">
                <use href="/sprite.svg#icon-calendar"></use>
              </svg>
              Year: {car.year}
            </li>
            <li>
              <svg width="16" height="16">
                <use href="/sprite.svg#icon-car"></use>
              </svg>
              Type: {car.type}
            </li>
            <li>
              <svg width="16" height="16">
                <use href="/sprite.svg#icon-fuel-pump"></use>
              </svg>
              Fuel Consumption: {car.fuelConsumption}
            </li>
            <li>
              <svg width="16" height="16">
                <use href="/sprite.svg#icon-gear"></use>
              </svg>
              Engine Size: {car.engineSize}
            </li>
          </ul>
        </div>

        <div className={css.right_block}>
          <h3 className={css.block_title}>Accessories and functionalities:</h3>
          <ul className={css.block_list}>
            {car.accessories.map((access) => (
              <li key={access}>
                <svg width="16" height="16">
                  <use href="/sprite.svg#icon-check-circle"></use>
                </svg>
                {access}
              </li>
            ))}

            {car.functionalities.map((func) => (
              <li key={func}>
                <svg width="16" height="16">
                  <use href="/sprite.svg#icon-check-circle"></use>
                </svg>
                {func}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
