import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import NavTabs from "../components/Tabs/NavTabs";
import TabTitle from "../components/Tabs/TabTitle";
import TabContent from "../components/Tabs/TabContent";
import TabButtonAdmin from "../components/Tabs/TabButtonAdmin";
import { useAuth } from "../auth/AuthProvider";
import Overlay from "../components/Other/Overlay";
import FormTournament from "../components/Forms/FormTournament";
import { loadEvent, loadTournaments } from "../utils/api";
import Tournament from "../components/PageEvent/Tournament";

import {WebsocketContext} from "../ws/WebsocketProvider.jsx"

function Event() {

  const socketUrl = 'ws://localhost:8080/ws';

  const { user, handleSignOut } = useAuth();
  const { id } = useParams();

  const [displayFormTournament, setDisplayFormTournament] = useState(false);
  const [eventData, setEventData] = useState({
    name: "",
  });
  const [tournaments, setTournaments] = useState([]);

  const fetchData = async () => {
    const event = await loadEvent(id);
    setEventData(event);

    const tournaments = await loadTournaments(id);
    setTournaments(tournaments);
  };

  useEffect(() => {
    fetchData().then(r => {});
  }, []);

  const stompClient = useContext(WebsocketContext);

    const handleTest = () =>{
      stompClient.current.publish({destination: "/app/hello", body: "Hello, STOMP"});
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
