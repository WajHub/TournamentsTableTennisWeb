import React, {useState} from 'react';
import {ErrorMessage, Form, Formik} from "formik";
import Input from "../shared/Input.jsx";
import * as Yup from "yup";
import {Button} from "@mui/material";
import Message from "../shared/Message.jsx";
import {changePassword} from "../../utils/api.js";

function ChangePasswordForm() {

    const[error, setError] = useState(null);

    const [message, setMessage] = useState({
        content: "",
        type: "",
    });

    const initialValues = {
        oldPassword: "",
        newPassword: "",
        confirmationNewPassword: ""
    };

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().required("Required"),
        newPassword: Yup.string().notOneOf([Yup.ref('oldPassword')],  "New password must be different from old password").required("Required"),
        confirmationNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null],  "Passwords must match").required("Required"),
    });

    const onSubmit = async (values, {resetForm}) => {
        changePassword(values).then((response) =>{
            if (response.status === 200) {
                console.log(response)
                setMessage({
                    content: response.data,
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
        } );
    };

    return (
        <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            {({ values }) => (
                <Form>
                    <Input type="password"
                           name="oldPassword"
                           label="Password"
                           value={values.oldPassword}
                    />
                    <Input type="password"
                           name="newPassword"
                           label="New Password"
                           value={values.newPassword}
                    />
                    <Input type="password"
                           name="confirmationNewPassword"
                           label="Reapet Password"
                           value={values.confirmationNewPassword}
                    />
                    <Message content={message.content} type={message.type} />
                    <Button type="submit" className="btn btn-primary">
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

export default ChangePasswordForm;