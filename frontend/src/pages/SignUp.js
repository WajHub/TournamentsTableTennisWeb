import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Message from "./../components/Message.js";

function SignUp() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [alertData, setAlertData] = useState(null);

  const { fullName, email, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:8080/auth/signup", user)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            setAlertData({ content: "Success!", typeMessage: "success" });
            setUser({ email: "", fullName: "", password: "" });
          } else {
            setAlertData({ content: "ERROR!", typeMessage: "danger" });
            setUser({ email: "", fullName: "", password: "" });
          }
        });
    } catch (error) {
      setAlertData({ content: error.response.data, typeMessage: "danger" });
      setUser({ email: "", fullName: "", password: "" });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h3>Register</h3>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label htmlFor="fullnameInput">Full Name</label>
              <input
                type="fullname"
                className="form-control"
                id="fullnameInput"
                placeholder="Enter your fullName"
                onChange={(e) => onInputChange(e)}
                name="fullName"
                value={fullName}
              ></input>
            </div>
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
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
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
          {alertData != null ? (
            <Message content={alertData.content} type={alertData.typeMessage} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
