import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import NavTabs from "./tabs/NavTabs.jsx";
import TabTitle from "./tabs/TabTitle.jsx";
import TabContent from "./tabs/TabContent.jsx";
import TabButtonAdmin from "./tabs/TabButtonAdmin.jsx";
import {isMod, useAuth} from "../../providers/AuthProvider.jsx";
import Overlay from "../shared/Overlay.jsx";
import FormTournament from "./FormTournament.jsx";
import { loadEvent, loadTournaments } from "../../utils/api.js";
import Tournament from "./Tournament.jsx";
import {WebsocketContext} from "../../providers/WebsocketProvider.jsx"
import {TournamentsContext} from "../../providers/TournamentsInEventProvider.jsx";


function Event() {
  const { user, handleSignOut } = useAuth();
  const { id } = useParams();

  const [displayFormTournament, setDisplayFormTournament] = useState(false);
  const [eventData, setEventData] = useState({
    name: "",
  });

  const {subscribe, unsubscribe} = useContext(WebsocketContext);
  const {tournaments, dispatch} = useContext(TournamentsContext)

  const fetchData = async () => {
    const event = await loadEvent(id);
    setEventData(event);

    const response = await loadTournaments(id);
    dispatch({
        type: "fetchTournaments",
        data: response
    })
  };

  useEffect(() => {
    fetchData().then(r => {});
  }, []);

    useEffect(() => {
        // console.log(tournaments)
    }, [tournaments]);

  useEffect(() =>{
    const channel = `/topic/events/${id}`

    const subscription = subscribe(channel, (response) => {
      const tournamentUpdated = JSON.parse(response);
      console.log("Received message: ", tournamentUpdated);
      dispatch({
          type:"updateTournament",
          data: tournamentUpdated
      })
    })

    return () =>  {
      unsubscribe(subscription);
    }
      }
  , [subscribe, unsubscribe]);


  if(tournaments === undefined) return (<div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
  </div>)

    return (
        <div className="mt-2">
            <h3 className="h3">{eventData.name}</h3>

            <NavTabs>
                {/*TITLE TABS */}
                {tournaments.map((tournament, index) => (
                    <TabTitle
                        key={tournament.id}
                        title={tournament.name}
                        id={tournament.id}
                        active={index === 0}
                    />
                ))}

                {/*TITLE TAB FOR ADMIN */}
                {(user && isMod(user)) ? (
                    <TabButtonAdmin
                        className="h1"
                        handleClick={(e) => setDisplayFormTournament(true)}
                    />
                ) : (
                    ""
                )}

                {/*CONTENT TABS */}
                {tournaments.map((tournament, index) => (
                    <TabContent key={tournament.id} id={tournament.id} active={index === 0}>
                        <Tournament tournament={tournament}/>
                    </TabContent>
                ))}
            </NavTabs>

            {/*FORM TOURNAMENT */}
            <Overlay
                isDisplayed={displayFormTournament}
                setDisplay={setDisplayFormTournament}
            >
                <FormTournament
                    setDisplay={setDisplayFormTournament}
                ></FormTournament>
            </Overlay>
        </div>
    );
}

export default Event;
