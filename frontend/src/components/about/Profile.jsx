import React, {useState} from 'react';
import {Button} from "@mui/material";
import Overlay from "../shared/Overlay.jsx";
import ChangePasswordForm from "./ChangePasswordForm.jsx";

function Profile({user}) {
    const [isOverlay, setOverlay] = useState(false);

    const handleShowOverlay = () => {
        setOverlay(true);
    }

    const handleChangePassword = () => {

    }

    return (
        <div className="d-flex justify-content-center flex-wrap">
            <div className="border rounded p-4 mt-2 shadow w-50">
                <h2 className="text-center m-4">User Details</h2>
                <div className="card">
                    <div className="card-header">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <b>Email: </b>
                                {user.email}
                            </li>
                            <li className="list-group-item">
                                <b>Fullname: </b>
                                {user.fullName}
                            </li>
                            <li className="list-group-item">
                                <b>Role: </b>
                                {user.role}
                            </li>
                        </ul>
                    </div>
                    <Button
                        onClick={handleShowOverlay}
                    >
                        Change password
                    </Button>
                </div>
            </div>
            <Overlay
                isDisplayed={isOverlay}
                setDisplay={setOverlay}
            >
                <ChangePasswordForm />
            </Overlay>
        </div>
    );

}
export default Profile;