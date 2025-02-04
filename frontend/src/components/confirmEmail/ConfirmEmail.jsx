import React, {useEffect, useState} from 'react';
import {Link, useParams, useSearchParams} from "react-router-dom";
import {confirmEmail} from "../../utils/api.js";

function ConfirmEmail(props) {

    const [params] = useSearchParams();

    const [message, setMessage] = useState({
        title: "",
        content: ""
    })

    useEffect(() => {
        confirmEmail(params.get("token"))
            .then((result) => {
                console.log("TEST")
                console.log(result)
                if(result.status === 200) {
                    setMessage({
                        title:"Good!",
                        content: "User account was activated!"
                    })
                }
            })
            .catch((e)=>{
                console.log("TEST")
                setMessage({
                    title:"Error!",
                    content: "Something went wrong!"
                })
            })
    }, []);

    return (
        <div className="d-flex align-items-center justify-content-center ">
            <div className="text-center">
                <h1 className="display-1 fw-bold">{message.title}</h1>
                <p className="lead">
                    {message.content}
                </p>
                <Link className={"btn btn-primary"}
                      to={"/"}
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}

export default ConfirmEmail;