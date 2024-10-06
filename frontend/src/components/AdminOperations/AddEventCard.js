import React from "react";
import { useAuth, isAuth, isMod } from "../AuthProvider.js";
function AddEventCard() {
  const { user } = useAuth();
  return (
    <>
      {isAuth(user) && isMod(user) ? (
        <div className="card event-card my-4">
          <div className="card-body">
            <h1 className="text-success">
              {" "}
              <i className="bi bi-plus-circle"></i>
            </h1>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default AddEventCard;
