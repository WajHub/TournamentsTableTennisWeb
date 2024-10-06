import React from "react";

function EventCard() {
  return (
    <div className="card event-card my-4">
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          <small className="text-muted">Last updated 3 mins ago</small>
        </p>
      </div>
    </div>
  );
}

export default EventCard;
