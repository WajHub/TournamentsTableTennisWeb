import React from "react";
import { useAuth, isAuth, isMod } from "../../auth/AuthProvider.jsx";
function AddEventCard({ hanldeClick }) {
  const { user } = useAuth();
  return (
    <>
      {isAuth(user) && isMod(user) ? (
        <div className="col-4">
          <div className="card event-card my-4 btn" onClick={hanldeClick}>
            <div className="card-body">
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
    </>
  );
}

export default AddEventCard;
