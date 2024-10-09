import React from "react";
import { useAuth } from "../components/AuthProvider";

function About() {
  const { user, handleSignIn, handleSignOut } = useAuth();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
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
                  {user.username}
                </li>
                <li className="list-group-item">
                  <b>Role: </b>
                  {user.role}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
