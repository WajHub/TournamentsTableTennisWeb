import React, { useState, useEffect } from "react";
import EventCard from "./EventCard.jsx";
import AddEventCard from "./admin-components/AddEventCard.jsx";
import Overlay from "../shared/Overlay.jsx";
import FormEvent from "./FormEvent.jsx";
import axios from "axios";
import Search from "../shared/Search.jsx";
import { loadEvents } from "../../utils/api.js";

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

  const addEvent = (e) =>{
      setEvents([
          ...events,
          e
      ])
  }

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

        {/* Display event */}
        {filteredEvents.map((event, index) => (
          <div className="col-4" key={index}>
            <EventCard event={event} loadData={loadData} />
          </div>
        ))}
      </div>

      {/* Overlay for the form */}
      <Overlay isDisplayed={displayFormEvent} setDisplay={setDisplayFormEvent}>
        <FormEvent setDisplay={setDisplayFormEvent} updateData={loadData} />
      </Overlay>
    </div>
  );
}

export default Home;
