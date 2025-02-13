import React, {useState} from 'react';
import {Button} from "@mui/material";
import Overlay from "../shared/Overlay.jsx";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import Input from "../shared/Input.jsx";
import {resetPassword} from "../../utils/api.js";
import Message from "../shared/Message.jsx";

function ForgotPassword(props) {

    const [isOpen, setOpen] = useState(false);

    const [message, setMessage] = useState({
        type: "",
        content: ""
    })

    const initialValue = {
        email: ""
    }
    const validationSchema = Yup.object().shape(
        {email: Yup.string().email("Invalid email").required("Required")}
    )

    const onSubmit = async (values, {resetForm}) => {
        resetPassword(values.email).then((r) => {
            resetForm();
            setMessage({
                type: "primary",
                content: "Link to reset password has been sent."
            })
        })
    }

    return (
        <>
            <Button className="mt-2" onClick={() => setOpen(true)}>Forgot password </Button>
            <Overlay isDisplayed={isOpen} setDisplay={setOpen}>
                <Formik
                    initialValues={initialValue}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {({values})=> (
                        <Form>
                            <Input type="text" name="email" label="Email" value={values.email}/>
                            <Button type="submit">Reset Password</Button>
                            <Message type={message.type} content={message.content} />
                        </Form>
                    )}
                </Formik>
            </Overlay>
        </>
    );
}

export default ForgotPassword;