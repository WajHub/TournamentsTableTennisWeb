import React, { useState, useEffect } from "react";
import EventCard from "./EventCard.jsx";
import AddEventCard from "./admin-components/AddEventCard.jsx";
import Overlay from "../shared/Overlay.jsx";
import FormEvent from "./FormEvent.jsx";
import Search from "../shared/Search.jsx";
import { loadEvents } from "../../utils/api.js";
import {Pagination, Stack, Typography} from "@mui/material";
import {useWindowSize} from "@uidotdev/usehooks";
import {isAuth, useAuth} from "../../providers/AuthProvider.jsx";

function Home() {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    const [displayFormEvent, setDisplayFormEvent] = useState(false);

    const size = useWindowSize();
    const [numberOfElementsInPage, setNumberOfElementsInPage] = useState(9);
    const [numberOfPages, setNumberOfPages] = useState(10)

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };


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
      setFilteredEvents([
          ...filteredEvents,
          e
      ])
  }

  const setDisplayingCards = () =>{
      const additionalCard = isAuth(user) ? 1 : 0;
      if(size.height>900) {
          setNumberOfElementsInPage(12 - additionalCard);
          setNumberOfPages(Math.ceil(filteredEvents.length/numberOfElementsInPage))
      }
      else {
          setNumberOfElementsInPage(9 - additionalCard);
          setNumberOfPages(Math.ceil(filteredEvents.length/numberOfElementsInPage))
      }
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
      setDisplayingCards();
  }, [filteredEvents, isAuth(user)])

  useEffect(()=>{
    setDisplayingCards();
  }, [useWindowSize().height])

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
            <AddEventCard handleClick={(e) => {
                setDisplayFormEvent(true)
            }}/>

            {/* Display event */}
            {filteredEvents.slice((page-1)*numberOfElementsInPage, numberOfElementsInPage + (page-1)*numberOfElementsInPage).map((event, index) => (
                <div className="col-4" key={index}>
                    <EventCard event={event} loadData={loadData}/>
                </div>
            ))}
        </div>

        <Stack spacing={2} className="align-items-center">
            <Typography>Page: {page}</Typography>
            <Pagination count={numberOfPages} page={page} onChange={handleChange} />
        </Stack>

        {/* Overlay for the form */}
        <Overlay isDisplayed={displayFormEvent} setDisplay={setDisplayFormEvent}>
        <FormEvent setDisplay={setDisplayFormEvent} updateData={addEvent} />
      </Overlay>
    </div>
  );
}

export default Home;
