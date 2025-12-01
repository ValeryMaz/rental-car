"use client";

import Link from "next/link";
import css from "./Header.module.css";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className={css.header_container}>
      <Link className={css.header_logo} href="/" aria-label="Home">
        <svg className="logo_icon" width="104" height="16">
          <use href="/sprite.svg#icon-RentalCar"></use>
        </svg>
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.header_list}>
          <li className={css.header_list_item}>
            <Link href="/" className={pathname === "/" ? css.active : ""}>
              Home
            </Link>
          </li>
          <li className={css.header_list_item}>
            <Link
              className={pathname === "/catalog" ? css.active : ""}
              href="/catalog"
            >
              Catalog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
