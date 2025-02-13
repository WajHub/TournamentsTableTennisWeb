import React from 'react';
import {Form, Formik} from "formik";
import Input from "../shared/Input.jsx";
import {Button} from "@mui/material";
import * as Yup from "yup";
import {useNavigate, useSearchParams} from "react-router-dom";
import {resetPassword_confirm} from "../../utils/api.js";

function ResetPasswordForm(props) {

    const [params] = useSearchParams();

    const navigate = useNavigate();

    const initialValues = {
        password: "",
        confirmationPassword: "",
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string().required("Required"),
        confirmationPassword: Yup.string().oneOf([Yup.ref('password'), null],  "Passwords must match").required("Required"),
    });

    const onSubmit = async (values) => {
        resetPassword_confirm({
            newPassword: values.password,
            confirmationNewPassword: values.confirmationPassword
        },params.get("token")
        ).then((r) => {
            console.log(r)
            navigate("/signIn");
        })
    };

    return (
        <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            {({ values }) => (
                <Form>
                    <Input
                        type="password"
                        name="password"
                        label="Password"
                        value={values.password}
                    />
                    <Input
                        type="password"
                        name="confirmationPassword"
                        label="Confirm Password"
                        value={values.confirmationPassword}
                    />
                    <Button type="submit" className="btn btn-primary">
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

export default ResetPasswordForm;