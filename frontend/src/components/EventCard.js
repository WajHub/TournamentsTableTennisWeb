import React from "react";

function EventCard({ event }) {
  return (
    <div className="card event-card my-4">
      <div className="card-body">
        <h5 className="card-title">{event.name}</h5>
        <p className="card-text">
          <small className="text-muted">
            {event.date != null ? event.date : ""}
          </small>
        </p>
      </div>
    </div>
  );
}

export default EventCard;
