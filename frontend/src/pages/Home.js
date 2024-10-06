import React from "react";
import EventCard from "../components/EventCard.js";
import AddEventCard from "../components/AdminOperations/AddEventCard.js";
import { useAuth } from "../components/AuthProvider.js";

function Home() {
  const { user } = useAuth();
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <EventCard />
        </div>
        <div className="col-4">
          <EventCard />
        </div>
        <div className="col-4">
          <EventCard />
        </div>
        <div className="col-4">
          <EventCard />
        </div>
        <div className="col-4">
          <AddEventCard />
        </div>
      </div>
    </div>
  );
}

export default Home;
