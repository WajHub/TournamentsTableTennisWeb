import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import NavTabs from "./tabs/NavTabs.jsx";
import TabTitle from "./tabs/TabTitle.jsx";
import TabContent from "./tabs/TabContent.jsx";
import TabButtonAdmin from "./tabs/TabButtonAdmin.jsx";
import { useAuth } from "../../providers/AuthProvider.jsx";
import Overlay from "../shared/Overlay.jsx";
import FormTournament from "./FormTournament.jsx";
import { loadEvent, loadTournaments } from "../../utils/api.js";
import Tournament from "./Tournament.jsx";

import {WebsocketContext} from "../../providers/WebsocketProvider.jsx"

function Event() {
  const { user, handleSignOut } = useAuth();
  const { id } = useParams();

  const [displayFormTournament, setDisplayFormTournament] = useState(false);
  const [eventData, setEventData] = useState({
    name: "",
  });
  const [tournaments, setTournaments] = useState([]);
  const {subscribe, unsubscribe, sendMessage} = useContext(WebsocketContext);

  const fetchData = async () => {
    const event = await loadEvent(id);
    setEventData(event);

    const tournaments = await loadTournaments(id);
    setTournaments(tournaments);
  };

  useEffect(() => {
    fetchData().then(r => {});
  }, []);


  useEffect(() =>{
    const channel = `/topic/events/${id}`
    const subscription = subscribe(channel, (message) =>{
      console.log("Received message: ", message);
    })

    return () =>  {
      unsubscribe(subscription);
    }
      }
  , [subscribe, unsubscribe]);



    const handleTest = () =>{
      sendMessage(`/app/events/${id}`, JSON.stringify({ content: 'Hello, WebSocket!' }));
    }

  return (
    <div>
      <h3 className="h3">{eventData.name}</h3>
        <button onClick={handleTest}>TEST</button>
      <NavTabs>
        {/*TITLE TABS */}
        {tournaments.map((tournament) => (
          <TabTitle
            key={tournament.id}
            title={tournament.name}
            id={tournament.id}
            active={false}
          />
        ))}

        {/*TITLE TAB FOR ADMIN */}
        {user ? (
          <TabButtonAdmin
            className="h1"
            handleClick={(e) => setDisplayFormTournament(true)}
          />
        ) : (
          ""
        )}

        {/*CONTENT TABS */}
        {tournaments.map((tournament) => (
          <TabContent key={tournament.id} id={tournament.id} active={false}>
            <Tournament idTournament={tournament.id} />
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
          loadData={() => loadTournaments(id).then(setTournaments)}
        ></FormTournament>
      </Overlay>
    </div>
  );
}

export default Event;
