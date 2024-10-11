import React, { useState, useEffect } from "react";
import EventCard from "../components/home/EventCard.js";
import AddEventCard from "../components/AdminOperations/AddEventCard.js";
import Overlay from "../components/Overlay.js";
import FormEvent from "../components/AdminOperations/FormEvent.js";
import axios from "axios";

function Home() {
  const [events, setEvents] = useState([]);
  const [displayFormEvent, setDisplayFormEvent] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    await axios
      .get("http://localhost:8080/api/events")
      .then(function (response) {
        setEvents(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        {events.map((e, index) => (
          <div className="col-4" key={index}>
            <EventCard event={e} />
          </div>
        ))}

        <div className="col-4">
          <AddEventCard hanldeClick={(e) => setDisplayFormEvent(true)} />
        </div>
      </div>
      <Overlay isDisplayed={displayFormEvent} setDisplay={setDisplayFormEvent}>
        <FormEvent setDisplay={setDisplayFormEvent} loadData={loadEvents} />
      </Overlay>
    </div>
  );
}

export default Home;
