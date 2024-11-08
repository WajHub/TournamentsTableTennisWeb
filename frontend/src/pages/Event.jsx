import React, { useState, useEffect } from "react";
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

function Event() {
  const { user, handleSignOut } = useAuth();
  const { id } = useParams();
  const [displayFormTournamen, setDisplayFormTournament] = useState(false);
  const [eventData, setEventData] = useState({
    name: "",
  });
  const [tournaments, setTournaments] = useState([]);
  const [selectedTabTournament, setSelectedTabTournament] = useState(null);

  const fetchData = async () => {
    const event = await loadEvent(id);
    setEventData(event);

    const tournaments = await loadTournaments(id);
    setTournaments(tournaments);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
      <h3 className="h3">{eventData.name}</h3>

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
            <Tournament tournament={tournament} fetchData={fetchData} />
          </TabContent>
        ))}
      </NavTabs>

      {/*FORM TOURNAMENT */}
      <Overlay
        isDisplayed={displayFormTournamen}
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
