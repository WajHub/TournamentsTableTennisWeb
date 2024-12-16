import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { isAuth, useAuth } from "../../providers/AuthProvider.jsx";
import { Formik, Form } from "formik";
import Input from "../shared/Input.jsx";
import * as Yup from "yup";

function FormSingIn() {
  let navigate = useNavigate();
  const { user, handleSignIn } = useAuth();
  const[error, setError] = useState(null);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const onSubmit = async (values) => {
    const result = await handleSignIn(values);
    if (result) {
      setError(null);
      navigate("/");
    } else {
      setError("Invalid login credentials. Please try again.")
    }
  };

  useEffect(() => {
    if (isAuth(user)) {
      navigate("/");
    }
  }, []);
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ values }) => (
          <Form>
            <Input type="text" name="email" label="Email" value={values.email}/>
            <Input
                type="password"
                name="password"
                label="Password"
                value={values.password}
            />
            {error ? (<div className="alert alert-danger" role="alert">
              {error}
            </div>) : ""}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </Form>
      )}
    </Formik>
  );
}

export default FormSingIn;
