import React, {useEffect, useState} from 'react';
import ResetPasswordForm from "./ResetPasswordForm.jsx";

function ResetPassword(props) {

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h3>Reset Password</h3>
                    <ResetPasswordForm />
                </div>
            </div>
        </div>

    );
}

export default ResetPassword;