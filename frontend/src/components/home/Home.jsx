import React, { useState, useEffect, useRef } from "react";
import EventCard from "./EventCard.jsx";
import AddEventCard from "./admin-components/AddEventCard.jsx";
import Overlay from "../shared/Overlay.jsx";
import FormEvent from "./FormEvent.jsx";
import SearchType from "../shared/SearchType.jsx";
import {deleteEvent, loadEvents} from "../../utils/api.js";
import {Pagination, Stack, Typography} from "@mui/material";
import {useWindowSize} from "@uidotdev/usehooks";
import {isAuth, useAuth} from "../../providers/AuthProvider.jsx";
import {AnimatePresence, motion} from "framer-motion";

function Home() {

    const { user } = useAuth();

    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    const [displayFormEvent, setDisplayFormEvent] = useState(false);

    const [pagination, setPagination] = useState({
        size: useWindowSize(),
        numberOfElementsPerPage: 9,
        numberOfPages: 10,
        page: 1
    })

    const [updatingEvent, setUpdatingEvent] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        setDisplayingCards();
    }, [filteredEvents, isAuth(user)])

    useEffect(()=>{
        setDisplayingCards();
    }, [useWindowSize().height])


    const handleChangePage = (event, value) => {
        setPagination({
            ...pagination,
            page: value
        })
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
        setUpdatingEvent(null);
      }

    const updateEvent = (e) => {
        const nextEvents =
            events.map((event) =>{
                if(event.id !== e.id) return event;
                else return {
                    ...events,
                    id: e.id, name: e.name, date: e.date,
                }
            })
        setEvents(nextEvents);

        const nextFilteredEvents =
            filteredEvents.map((event) =>{
                if(event.id !== e.id) return event;
                else return {
                    ...events,
                    id: e.id, name: e.name, date: e.date,
                }
            })
        setFilteredEvents(nextFilteredEvents);
    }

    const handleDeleteEvent = (idEvent) =>{
         deleteEvent(idEvent).then(r => {
             if(r.status === 204){
                 console.log("Good")
                 setEvents(
                     events.filter(e => e.id !== idEvent)
                 )
                 setFilteredEvents(
                     filteredEvents.filter(e => e.id !== idEvent)
                 )
             }
         })
     }

     const handleUpdateEvent = (event) => {
        setUpdatingEvent(event);
        setDisplayFormEvent(true);
     }

    const countNumberOfPages = (numberOfElements, numberOfElementsPerPage) => Math.ceil(numberOfElements/numberOfElementsPerPage)

    const setDisplayingCards = () =>{
          const additionalCard = isAuth(user) ? 1 : 0;
          if(pagination.size.height>900) {
              const newNumberOfElementsPerPage = 12 - additionalCard
              setPagination({
                  ...pagination,
                  numberOfElementsPerPage: newNumberOfElementsPerPage,
                  numberOfPages: countNumberOfPages(filteredEvents.length, newNumberOfElementsPerPage)
              })
          }
          else {
              const newNumberOfElementsPerPage = 9 - additionalCard
              setPagination({
                  ...pagination,
                  numberOfElementsPerPage: newNumberOfElementsPerPage,
                  numberOfPages: countNumberOfPages(filteredEvents.length, newNumberOfElementsPerPage)
              })
          }
      }

    const filtering = (object, newSearch) => object.name.toLowerCase().includes(newSearch.toLowerCase());

  return (
    <div className="container mt-2">

        <SearchType
            apiSet={events}
            setFilteredSet={setFilteredEvents}
            filter={filtering}
            focusOnInput={!displayFormEvent}
        />

        <div className="row" >
            {/* Button to add new event */}
            <AddEventCard handleClick={(e) => {
                setDisplayFormEvent(true);
            }}/>

            {/* Display event */}
            <AnimatePresence mode="popLayout">
                {filteredEvents
                    .slice((pagination.page-1)*pagination.numberOfElementsPerPage,
                            pagination.numberOfElementsPerPage + (pagination.page-1) * pagination.numberOfElementsPerPage)
                    .map((event, index) => (
                            <motion.div className="col-4"
                                        key={event.id}
                                        initial={{scale: 0, x: -10} }
                                        animate={{scale: 1, x: 0}}
                                        transition={{duration: 0.09 + index * 0.06}}
                            >
                                <EventCard event={event}
                                           handleDelete={handleDeleteEvent}
                                           handleEdit={handleUpdateEvent}
                                />
                            </motion.div>
                    ))
                }
            </AnimatePresence>
        </div>

        <Stack spacing={2} className="align-items-center">
            <Typography>Page: {pagination.page}</Typography>
            <Pagination count={pagination.numberOfPages} page={pagination.page} onChange={handleChangePage}/>
        </Stack>

        {/* Overlay for the form */}
        <Overlay isDisplayed={displayFormEvent} setDisplay={setDisplayFormEvent} >
            <FormEvent setDisplay={setDisplayFormEvent}
                       updateSavedEvent={addEvent}
                       updateUpdatedEvent={updateEvent}
                       eventToUpdate={updatingEvent} />
        </Overlay>
    </div>
  );
}

export default Home;
