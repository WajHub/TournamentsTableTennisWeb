import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { isAuth } from "../components/AuthProvider";

function SignIn() {
  let navigate = useNavigate();
  const { user, handleSignIn, handleSignOut } = useAuth();

  const [userDto, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userDto;

  const onInputChange = (e) => {
    setUser({ ...userDto, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    handleSignIn(userDto).then(navigate("/"));
  };

  useEffect(() => {
    if (isAuth(user)) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h3>Login</h3>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label htmlFor="emailInput">Email address</label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="Enter email"
                onChange={(e) => onInputChange(e)}
                name="email"
                value={email}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="passwordInput">Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Password"
                onChange={(e) => onInputChange(e)}
                name="password"
                value={password}
              ></input>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
