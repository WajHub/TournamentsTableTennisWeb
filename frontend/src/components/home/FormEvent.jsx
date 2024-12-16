import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../shared/Input.jsx";
import axios from "axios";
import { formatDate } from "../../utils/date.js";

function FormEvent({ setDisplay, loadData }) {
  const initialValues = {
    name: "",
    date: formatDate(new Date()),
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Required"),
  });

  const onSubmit = async (values) => {
    try {
      await axios
        .post(
          "http://localhost:8080/api/manage/events",
          { name: values.name, date: values.date },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status === 201) {
            setDisplay(false);
            loadData();
          } else {
          }
        });
    } catch (error) {}
  };
  return (
    <Formik
      className="container mt-4"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="row justify-content-center">
        <div className="col-md-6 mb-3">
          <Input type="text" name="name" label="Name of event" />
        </div>

        <div className="col-md-6 mb-3">
          <Input type="date" name="date" label="Date:" />
        </div>

        <div className="col-md-6 mb-3 text-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default FormEvent;
