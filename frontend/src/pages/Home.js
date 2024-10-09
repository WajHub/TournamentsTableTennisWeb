import React, { useState } from "react";
import EventCard from "../components/EventCard.js";
import AddEventCard from "../components/AdminOperations/AddEventCard.js";
import Overlay from "../components/Overlay.js";
import { useAuth } from "../components/AuthProvider.js";
import FormEvent from "../components/AdminOperations/FormEvent.js";

function Home() {
  const { user } = useAuth();

  const [displayFormEvent, setDisplayFormEvent] = useState(false);

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
          <AddEventCard hanldeClick={(e) => setDisplayFormEvent(true)} />
        </div>
      </div>
      <Overlay isDisplayed={displayFormEvent} setDisplay={setDisplayFormEvent}>
        <FormEvent />
      </Overlay>
    </div>
  );
}

export default Home;
