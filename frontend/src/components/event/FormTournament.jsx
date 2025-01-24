import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import Input from "../shared/Input.jsx";
import * as Yup from "yup";
import {setResultGame, submitTournament} from "../../utils/api.js";
import {TournamentsContext} from "../../providers/TournamentsInEventProvider.jsx";
import {Button} from "@mui/material";

function FormTournament({ setDisplay }) {
  const { id } = useParams();
  const initialValues = {
    name: "",
    category: "Senior - man",
    event_id: id,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(32, "Too Long!").required("Required!"),
    category: Yup.string().required("Required!"),
  });

  const [categories, setCategories] = useState([]);
  const {dispatch} = useContext(TournamentsContext)

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async (setFieldValue) => {
    try {
      const result = await axios.get(`http://localhost:8080/api/categories`);
      setCategories(result.data);
    } catch (err) {}
  };

  const onSubmit = async (values) => {
    submitTournament(values).then(r => {
      if(r.status === 201){
        setDisplay(false);
        dispatch({
          type: "addTournament",
          data: r.data
        })
      }
    });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      className="container mt-4"
    >
      {({ values }) => (
        <Form className="row ">
          <div className="col-md-6 mb-3">
            <Input type="text" name="name" label="Name" value={values.name} />
          </div>

          <div className="col-md-6 mb-3">
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Choose a category:
              </label>
              <Field as="select" name="category" className="form-control">
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Field>
            </div>
          </div>

          <div className="col mb-3 text-center">
            <Button variant="contained" color="primary" type="submit" >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default FormTournament;
