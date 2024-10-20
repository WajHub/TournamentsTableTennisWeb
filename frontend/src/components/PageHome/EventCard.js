import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider.js";
function EventCard({ event }) {
  const { user } = useAuth();
  return (
    <Link
      className="card event-card my-4"
      to={`/eventInfo/${event.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="card-body">
        <h5 className="card-title">{event.name}</h5>
        <p className="card-text">
          <small className="text-muted">
            {event.date != null ? event.date : ""}
          </small>
        </p>
        {user ? (
          <div className="container">
            <div className="row ">
              <div className="col text-right">
                {" "}
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("EDIT");
                  }}
                >
                  <i className="bi bi-pencil"></i>
                </button>
              </div>
              <div className="col text-left">
                {" "}
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("DELETE");
                  }}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
}

export default EventCard;
