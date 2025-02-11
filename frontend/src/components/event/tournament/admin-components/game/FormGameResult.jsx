import React, {useContext} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {array, number} from "yup";
import {setResultGame} from "../../../../../utils/api.js";
import {WebsocketContext} from "../../../../../providers/WebsocketProvider.jsx";
import {Button} from "@mui/material";

function FormGameResult({setDisplay, gameId, homeId, awayId, eventId}) {

    const {sendMessage} = useContext(WebsocketContext);

    const initialValues = {
        homeId: homeId,
        awayId: awayId,
        pointsHome: [0, 0, 0],
        pointsAway: [0, 0, 0],
    };

    const validatePoint = number().min(0).required("Points are required");

    const validationSchema = Yup.object().shape({
        pointsHome: array().of(validatePoint).min(3),
        pointsAway: array().of(validatePoint).min(3),
    }).test({
        name: 'correct-points',
        test: function(values)
        {
            const { pointsHome, pointsAway } = values;

            if (!pointsHome || !pointsAway || pointsHome.length !== pointsAway.length) return false;

            let setsHome = 0;
            let setsAway = 0;

            for (let i = 0; i < pointsHome.length; i++) {
                const pointsH = pointsHome[i];
                const pointsA = pointsAway[i];
                if (pointsH < 11 && pointsA < 11) {
                    return this.createError({
                        path: `pointsHome[${i}]`,
                        message: `Invalid set score: Both scores must be at least 11.`,
                    });
                }
                if (Math.abs(pointsH - pointsA) < 2) {
                    return this.createError({
                        path: `pointsHome[${i}]`,
                        message: `Invalid set score: Difference must be at least 2.`,
                    });
                }

                if (pointsH > pointsA) {
                    setsHome++;
                } else {
                    setsAway++;
                }
            }
            if (setsHome < 3 && setsAway < 3) {
                return this.createError({
                    path: `pointsHome[0]`,
                    message: `Invalid result: Neither player has won at least 3 sets.`,
                });
            }
            return true;
        }
    });


    const handleChangeResult = (values) => {
        const NUMBER_OF_SETS_TO_WIN = 3;
        let {pointsHome, pointsAway} = values;
        let setsHome = 0;
        let setsAway = 0;
        let length = pointsAway.length

        for(let i= 0; i<length; i++){
            if(pointsHome[i] >= 11 || pointsAway[i] >= 11){
                if(pointsHome[i]>pointsAway[i]) setsHome++;
                else setsAway++;
            }
        }
        let setsFinished =  setsHome + setsAway;

        let requiredSets = (setsHome>setsAway) ?  NUMBER_OF_SETS_TO_WIN - setsHome  : NUMBER_OF_SETS_TO_WIN - setsAway;
        let availableSets = length - setsFinished;

        for(let i = availableSets; i<requiredSets; i++){
            pointsHome.push(0);
            pointsAway.push(0);
        }

        for(let i = requiredSets; i < availableSets; i++){
            pointsHome.pop();
            pointsAway.pop();
        }


    }

    const onSubmit = (values) =>{
        setResultGame(gameId, values).then(r => {
            if(r.status === 200){
                setDisplay(false);
                let tournamentUpdated = r.data;
                sendMessage(`/app/events/${eventId}`, (tournamentUpdated));
            }
        });
    }

    return (
            <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
                {({values, setFieldValue, isValid, submitCount}) => (
                    <Form>
                        {values.pointsAway.map((point, index) =>
                            <div key={index} className="mt-2">
                                <div className="row justify-content-center font-weight-bold">Set {index+1}</div>
                                <div className="row justify-content-center" >
                                    <div className="col-auto">
                                        <Field
                                            style={{ width: "7vw" }}
                                            size="small"
                                            type="number"
                                            name={`pointsHome[${index}]`}
                                            value={values.pointsHome[index]}
                                            onChange={(e) => {
                                                setFieldValue(`pointsHome[${index}]`, Number(e.target.value)).then(r => {});
                                            }}
                                           onBlur={(e) => {
                                               setFieldValue(`pointsHome[${index}]`, Number(e.target.value)).then(r => {});
                                               handleChangeResult(values)
                                           }}/>
                                    </div>
                                    <div className="col-auto font-weight-bold">:</div>
                                    <div className="col-auto">
                                        <Field
                                            style={{ width: "7vw" }}
                                            type="number"
                                            name={`pointsAway[${index}]`}
                                            value={values.pointsAway[index]}
                                            onChange={(e) => {
                                                setFieldValue(`pointsAway[${index}]`, Number(e.target.value)).then(r => {});


                                            }}
                                            onBlur={(e) => {
                                                setFieldValue(`pointsAway[${index}]`, Number(e.target.value)).then(r => {});
                                                handleChangeResult(values)
                                            }}/>
                                    </div>

                                </div>
                                <ErrorMessage name={`pointsHome[${index}]`}>
                                    {msg => <div className="mt-1 row alert alert-danger">Invalid points Home. {msg}</div>}
                                </ErrorMessage>
                                <ErrorMessage name={`pointsAway[${index}]`}>
                                    {msg => <div className="mt-1 row alert alert-danger">Invalid points Away. {msg}</div>}
                                </ErrorMessage>
                            </div>
                        )}
                        <div className="row justify-content-center m-2">
                            <Button variant="contained" color="success" type="submit" className="col-sm-6 col-md-4 col-lg-2 m-2">Finish
                            </Button>
                        </div>
                        {!isValid && submitCount > 0 && (
                            <div className="alert alert-danger">
                                Error: check every fields.
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
    );
}

export default FormGameResult;