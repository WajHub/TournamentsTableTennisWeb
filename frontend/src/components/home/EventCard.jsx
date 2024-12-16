import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider.jsx";
import { deleteEvent } from "../../utils/api.js";
function EventCard({ event, loadData }) {
  const { user } = useAuth();

  const handleDeleteEvent = (id) => {
    console.log("ID", event.id);
    deleteEvent(id);
    loadData();
  };

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
                  disabled
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
                    handleDeleteEvent(event.id);
                  }}
                  disabled
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
