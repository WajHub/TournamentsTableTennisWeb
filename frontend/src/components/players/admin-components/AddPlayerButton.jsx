import React from "react";
import { useAuth, isAuth, isMod } from "../../../providers/AuthProvider.jsx";

function AddPlayerButton({ hanldeClick }) {
  const { user } = useAuth();
  return (
    <div className="container">
      {isAuth(user) && isMod(user) ? (
        <div
          className="row d-flex justify-content-center"
          onClick={(e) => hanldeClick(true)}
        >
          <div className="col-2">
            <div className="card event-card my-4 btn">
              <h1 className="text-success">
                {" "}
                <i className="bi bi-plus-circle"></i>
              </h1>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AddPlayerButton;
