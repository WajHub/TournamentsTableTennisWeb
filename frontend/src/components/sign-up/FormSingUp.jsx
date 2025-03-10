import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Input from "../shared/Input.jsx";
import Message from "../shared/Message.jsx";

const SignUpForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [message, setMessage] = useState({
    content: "",
    type: "",
  });
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("fullName is required!"),
    email: Yup.string()
      .email("Invalid email format!")
      .max(32, "Too Long!")
      .required("Email is required!"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters!")
      .max(32, "Too Long!")
      .required("Password is required!"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/signup`,
        values
      );
      if (response.status === 200) {
        setMessage({
          content: "User registered successfully!",
          type: "success",
        });
        resetForm();
      } else {
        setMessage({
          content: "Something went wrong!",
          type: "danger",
        });
        resetForm();
      }
    } catch (error) {
      setMessage({
        content: error.response.data,
        type: "danger",
      });
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form>
          <Input
            type="text"
            name="fullName"
            label="Fullname"
            value={values.fullName}
          ></Input>
          <Input type="text" name="email" label="Email" value={values.email}>
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </Input>
          <Input
            type="password"
            name="password"
            label="Password"
            value={values.password}
          ></Input>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Message content={message.content} type={message.type} />
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
