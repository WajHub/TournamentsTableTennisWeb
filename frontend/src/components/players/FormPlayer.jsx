import React, { useState } from "react";
import axios from "axios";
import { formatDate } from "../../utils/date.js";
import { Formik, Form, Field } from "formik";
import Input from "../shared/Input.jsx";
import * as Yup from "yup";
import {updatePlayer} from "../../utils/api.js";
import {Button} from "@mui/material";

function FormPlayer({ setDisplay, updateData, playerToUpdate }) {
    const apiUrl = import.meta.env.VITE_API_URL;
  const initialValues = playerToUpdate===null ?
      {
        firstname: "",
        lastname: "",
        gender: "MAN",
        date: formatDate(new Date()),
      }
      :
      {
        firstname: playerToUpdate.firstname,
        lastname: playerToUpdate.lastname,
        gender: playerToUpdate.gender,
        date: playerToUpdate.date,
      }

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().max(32, "Too Long!").required("Required!"),
    lastname: Yup.string().max(32, "Too Long!").required("Required!"),
    gender: Yup.string().required("Required!"),
    date: Yup.date().required("Required!"),
  });

  const onSubmit = async (values) => {
    try {
      if(playerToUpdate=== null) {
        await axios
            .post(
                `${apiUrl}/api/manage/players`,
                {
                  firstname: values.firstname,
                  lastname: values.lastname,
                  gender: values.gender,
                  date: values.date,
                },
                {
                  withCredentials: true,
                }
            )
            .then((response) => {
              if (response.status === 201) {
                setDisplay(false);
                updateData(response.data, true);
              } else {
              }
            });
      }
      else{
          updatePlayer(playerToUpdate.id,
              {
                  firstname: values.firstname,
                  lastname: values.lastname,
                  gender: values.gender,
                  date: values.date,
              }
              ).then((response) => {
              if (response.status === 200) {
                  setDisplay(false);
                  updateData(response.data, false);
              } else {
                  console.log("ERR")
              }
          });
          console.log(playerToUpdate)
          console.log(values)
      }

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      className="container mt-4"
    >
      {({ values }) => (
        <Form className="row justify-content-center">
          <div className="col-md-6 mb-3">
            <Input
              type="text"
              name="firstname"
              label="Firstname"
              value={values.firstname}
            />
          </div>
          <div className="col-md-6 mb-3">
            {" "}
            <Input
              type="text"
              name="lastname"
              label="Lastname"
              value={values.lastname}
            />
          </div>

          <div className="col-2 mb-3 d-flex align-items-center d-flex justify-content-end">
            Gender
          </div>

          <div className="col-2 mb-3 d-flex align-items-center d-flex justify-content-end">
            <Input type="radio" name="gender" label="Male" value="MAN" />
          </div>

          <div className="col-2 mb-3 d-flex align-items-center d-flex justify-content-start">
            <Input type="radio" name="gender" label="Female" value="WOMAN" />
          </div>

          <div className="col-6 mb-3 ">
            <Input type="date" name="date" label="Date:" value={values.date} />{" "}
          </div>

          <div className="col-md-4 text-center">
            <Button type="submit" className="btn btn-primary d-inline-block">
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default FormPlayer;
