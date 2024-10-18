import React, { useState, useEffect } from "react";
import EventCard from "../components/Home/EventCard.js";
import AddEventCard from "../components/AdminComponents/AddEventCard.js";
import Overlay from "../components/Overlay.js";
import FormEvent from "../components/Forms/FormEvent.js";
import axios from "axios";
import Search from "../components/Search.js";

function Home() {
  const [events, setEvents] = useState([]);

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [displayFormEvent, setDisplayFormEvent] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    await axios
      .get("http://localhost:8080/api/events")
      .then(function (response) {
        setEvents(response.data);
        setFilteredEvents(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
        <FormEvent setDisplay={setDisplayFormEvent} loadData={loadEvents} />
      </Overlay>
    </div>
  );
}

export default Home;
