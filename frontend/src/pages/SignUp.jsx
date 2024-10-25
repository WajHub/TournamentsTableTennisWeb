import React from "react";
import {} from "react-router-dom";
import FormSingUp from "../components/Forms/FormSingUp.jsx";

function SignUp() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h3>Register</h3>
          <FormSingUp />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
