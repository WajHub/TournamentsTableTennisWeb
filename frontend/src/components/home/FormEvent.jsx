import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../shared/Input.jsx";
import axios from "axios";
import { formatDate } from "../../utils/date.js";
import {updateEvent} from "../../utils/api.js";
import {Button} from "@mui/material";

function FormEvent({ setDisplay, updateSavedEvent, updateUpdatedEvent, eventToUpdate }) {

  const initialValues = eventToUpdate===null ?
      {name: "", date: formatDate(new Date())}
      :
      {name: eventToUpdate.name, date:eventToUpdate.date}

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Required"),
  });

  const onSubmit = async (values) => {
    try {
      if(eventToUpdate===null){
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
                updateSavedEvent(response.data);
              } else {
              }
            });
      }else{
        updateEvent(eventToUpdate.id, values).then((result) => {
          if(result.status === 200){
            setDisplay(false);
            updateUpdatedEvent(result.data);
          }
        });
      }

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
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </div>
      </Form>
    </Formik>
  );
}

export default FormEvent;
