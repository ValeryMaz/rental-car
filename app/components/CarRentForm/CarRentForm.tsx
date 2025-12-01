"use client";

import toast from "react-hot-toast";
import css from "./CarRentForm.module.css";

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  toast.success("Thank you! Your request has been sent successfully!");
  e.currentTarget.reset();
};

export default function CarRentForm() {
  return (
    <>
      <form onSubmit={handleSubmit} className={css.form}>
        {/* action*/}
        <h3 className={css.title}>Book your car now</h3>
        <p className={css.text}>
          Stay connected! We are always ready to help you.
        </p>
        <div className={css.input_container}>
          <input
            className={css.input_form}
            placeholder="Name*"
            name="name"
          ></input>
          <input
            className={css.input_form}
            placeholder="Email*"
            name="email"
          ></input>
          <input
            className={css.input_form}
            type="date"
            placeholder="Booking date"
            name="date"
          ></input>

          <textarea
            className={css.input_text}
            placeholder="Comment"
            name="comment"
          ></textarea>
        </div>
        <button className={css.send_btn} type="submit" disabled={false}>
          Send request
        </button>
      </form>
    </>
  );
}
