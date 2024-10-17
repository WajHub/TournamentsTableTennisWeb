import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function Input({ type, name, label, children }) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field type={type} className="form-control" id={name} name={name} />
      <ErrorMessage name={name} component="div" className="text-danger" />
      {/* {children} */}
    </div>
  );
}

export default Input;
