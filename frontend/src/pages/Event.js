import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavTabs from "../components/Tabs/NavTabs";
import TabTitle from "../components/Tabs/TabTitle";
import TabContent from "../components/Tabs/TabContent";
import TabButtonAdmin from "../components/Tabs/TabButtonAdmin";
import { useAuth } from "../auth/AuthProvider";
import Overlay from "../components/Overlay";
import FormTournament from "../components/Forms/FormTournament";
function Event() {
  const { user, handleSignOut } = useAuth();
  const { id } = useParams();
  const [displayFormTournamen, setDisplayFormTournament] = useState(false);
  const [eventData, setEventData] = useState({
    name: "",
  });
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    loadEvent();
    loadTournaments();
  }, []);
  const loadEvent = async () => {
    const result = await axios
      .get(`http://localhost:8080/api/event/${id}`)
      .then((response) => {
        setEventData(response.data);
      });
  };
  const loadTournaments = async () => {
    const result = await axios
      .get(`http://localhost:8080/api/tournaments/${id}`)
      .then((response) => {
        setTournaments(response.data);
        console.log(response.data);
      });
  };

  return (
    <div>
      <h3 className="h3">{eventData.name}</h3>

      <NavTabs>
        {tournaments.map((tournament, index) => (
          <TabTitle title={tournament.name} active={false} />
        ))}
        {user ? (
          <TabButtonAdmin
            className="h1"
            handleClick={(e) => setDisplayFormTournament(true)}
          />
        ) : (
          ""
        )}

        {/* <TabTitle title="home" active={true} />
        <TabTitle title="test" active={false} />
        
        <TabContent title="home" active={true}>
          HOME
        </TabContent>
        <TabContent title="test" active={false}>
          TEST
        </TabContent> */}
      </NavTabs>
      <Overlay
        isDisplayed={displayFormTournamen}
        setDisplay={setDisplayFormTournament}
      >
        <FormTournament
          setDisplay={setDisplayFormTournament}
          loadData={loadTournaments}
        ></FormTournament>
      </Overlay>
    </div>
  );
}

export default Event;
