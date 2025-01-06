import React from "react";
import { useAuth, isAuth, isMod } from "../../../providers/AuthProvider.jsx";
function AddEventCard({ handleClick }) {
  const { user } = useAuth();
  return (
    <>
      {isAuth(user) && isMod(user) ? (
        <div className="col-4">
          <div className="btn card event-card my-4  h-75" onClick={handleClick}>
            <div className="card-body d-flex justify-content-center align-items-center">
              <h1 className="text-success ">
                <i className="bi bi-plus-circle"></i>
              </h1>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default AddEventCard;
