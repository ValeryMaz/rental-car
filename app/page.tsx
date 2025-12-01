"use client";

import Link from "next/link";
import css from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div className={css.image_block}>
        <div className={css.hero_wrapper}>
          <h1 className={css.main_title}>Find your perfect rental car</h1>
          <p className={css.hero_text}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <Link className={css.link_hero} href="/catalog">
            View catalog
          </Link>
        </div>
      </div>
    </main>
  );
}
