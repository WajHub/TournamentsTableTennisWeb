import React from "react";
import { Field, ErrorMessage } from "formik";

function Input({ type, name, value, label, children }) {
  return (
    <div className="form-group">
      <label
        htmlFor={name}
        className={type === "radio" ? "form-check-label" : "form-label"}
      >
        {label}
      </label>
      <Field
        type={type}
        id={name}
        name={name}
        className={type === "radio" ? "form-check" : "form-control"}
        {...(value != null && { value })}
      />
      <ErrorMessage name={name} component="div" className="text-danger" />
      {children}
    </div>
  );
}

export default Input;
