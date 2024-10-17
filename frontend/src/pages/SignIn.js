import React from "react";
import FormSingIn from "../components/Forms/FormSingIn";

function SignIn() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h3>Login</h3>
          <FormSingIn />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
