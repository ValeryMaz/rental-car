"use client";

import toast from "react-hot-toast";
import css from "./CarRentForm.module.css";
import * as Yup from "yup";
import { useState } from "react";

const userSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  date: Yup.date().nullable().required("Booking date is required"),
  comment: Yup.string().nullable(),
});

export default function CarRentForm() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      date: formData.get("date") || null,
      comment: formData.get("comment") as string,
    };

    try {
      await userSchema.validate(values, { abortEarly: false });
      setErrors({});

      toast.success("Thank you! Your request has been sent successfully!");
      e.currentTarget.reset();
    } catch (err: any) {
      const formattedErrors: { [key: string]: string } = {};
      err.inner.forEach((error: any) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <h3 className={css.title}>Book your car now</h3>
      <p className={css.text}>
        Stay connected! We are always ready to help you.
      </p>

      <div className={css.input_container}>
        <input className={css.input_form} placeholder="Name*" name="name" />
        {errors.name && <p className={css.error}>{errors.name}</p>}

        <input className={css.input_form} placeholder="Email*" name="email" />
        {errors.email && <p className={css.error}>{errors.email}</p>}

        <input className={css.input_form} type="date" name="date" />
        {errors.date && <p className={css.error}>{errors.date}</p>}

        <textarea
          className={css.input_text}
          placeholder="Comment"
          name="comment"
        />
        {errors.comment && <p className={css.error}>{errors.comment}</p>}
      </div>

      <button className={css.send_btn} type="submit">
        Send request
      </button>
    </form>
  );
}
