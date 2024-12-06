import React from 'react';
import {formatDate} from "../../utils/date.js";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";

function FormGameResult({setDisplay, homeId, awayId}) {
    const initialValues = {
        homeId: awayId,
        awayId: homeId,
        pointsHome: [0],
        pointsAway: [0],
    };

    const validationSchema = Yup.object().shape({

    });

    const onSubmit = () =>{
        console.log("FINISH");
        setDisplay(false);
    }

    const onChange = (e) =>{
        console.log(initialValues)
    }

    return (
        <div className="mt-4">
            <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
                {({values}) => (
                    <Form>
                        {initialValues.pointsAway.map((point, index) =>
                            <div key={index}>
                                <div className="row justify-content-center font-weight-bold">Set {index+1}</div>
                                <div className="row" >
                                    <div className="col-5 justify-content-center">
                                        <Field style={{ width: "7vw" }} size="small" type="number" name="poinstHome" value={initialValues.pointsHome}
                                                                onChange={(e) => onChange(e)}/></div>
                                    <div className="col-2 font-weight-bold">:</div>
                                    <div className="col-5 justify-content-center">
                                        <Field style={{ width: "7vw" }} type="number" name="poinstAway" value={values.points2}
                                                                onChange={(e) => onChange(e)}/></div>
                                </div>
                            </div>
                        )}
                        <div className="row justify-content-center m-2">
                            <button type="submit" className="col-sm-6 col-md-4 col-lg-2  btn btn-success m-2">Finish
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

        </div>
    );
}

export default FormGameResult;