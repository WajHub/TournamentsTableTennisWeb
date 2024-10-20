import React, { useState, useEffect } from "react";
import EventCard from "../components/PageHome/EventCard.js";
import AddEventCard from "../components/AdminComponents/AddEventCard.js";
import Overlay from "../components/Other/Overlay.js";
import FormEvent from "../components/Forms/FormEvent.js";
import axios from "axios";
import Search from "../components/Other/Search.js";
import { loadEvents } from "../utils/api.js";

function Home() {
  const [events, setEvents] = useState([]);

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [displayFormEvent, setDisplayFormEvent] = useState(false);

  const loadData = () => {
    loadEvents().then((data) => {
      setEvents(data);
      setFilteredEvents(data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtering = (object, newSearch) =>
    object.name.toLowerCase().includes(newSearch.toLowerCase());

  return (
    <div className="container">
      <Search
        apiSet={events}
        setFilteredSet={setFilteredEvents}
        filter={filtering}
      />

      <div className="row">
        {/* Button to add new event */}
        <AddEventCard hanldeClick={(e) => setDisplayFormEvent(true)} />

        {/* Display events */}
        {filteredEvents.map((event, index) => (
          <div className="col-4" key={index}>
            <EventCard event={event} />
          </div>
        ))}
      </div>

      {/* Overlay for the form */}
      <Overlay isDisplayed={displayFormEvent} setDisplay={setDisplayFormEvent}>
        <FormEvent setDisplay={setDisplayFormEvent} loadData={loadData} />
      </Overlay>
    </div>
  );
}

export default Home;
