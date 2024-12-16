import React, {useEffect, useState} from "react";
import NavTabs from "./tabs/NavTabs.jsx";
import TabTitle from "./tabs/TabTitle.jsx";
import TabContent from "./tabs/TabContent.jsx";
import { useAuth } from "../../providers/AuthProvider.jsx";
import ManageTournament from "./tournament/admin-components/ManageTournament.jsx";
import PlayerList from "../shared/PlayerList.jsx";
import Draw from "./tournament/Draw.jsx";
import {loadEvent, loadTournament, loadTournaments} from "../../utils/api.js";

function Tournament({idTournament}) {
  const { user, handleSignOut } = useAuth();

  const [tournament, setTournament] = useState({
    playerDtoList: []
  });

  const fetchData = async () => {
    const tournament = await loadTournament(idTournament);
    setTournament(tournament);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container border rounded p-4 mt-2 shadow w-75">
      {" "}
      <NavTabs>
        {/*TITLE TABS */}
        <TabTitle
          key={`${idTournament}_1`}
          title="player List"
          id={`${idTournament}_1`}
          active={false}
        />
        <TabTitle
          key={`${idTournament}_2`}
          title="Draws"
          id={`${idTournament}_2`}
          active={false}
        />

        {/*TITLE TAB FOR ADMIN */}
        {user ? (
          <TabTitle
            key={`${idTournament}_-1`}
            title="manage"
            id={`${idTournament}_-1`}
            active={false}
          />
        ) : (
          ""
        )}
        {user ? (
          <TabContent
            key={`${idTournament}_-1`}
            id={`${idTournament}_-1`}
            active={false}
          >
            <ManageTournament tournament={tournament} refreshData={fetchData}/>
          </TabContent>
        ) : (
          ""
        )}

        {/*CONTENT TABS */}
        <TabContent
          key={`${idTournament}_1`}
          id={`${idTournament}_1`}
          active={false}
        >
          Player List {idTournament}
          <PlayerList
            players={tournament.playerDtoList}
            deletion={false}
            loadData={false}
          />
        </TabContent>
        <TabContent
          key={`${idTournament}_2`}
          id={`${idTournament}_2`}
          active={false}
        >
          <Draw tournament={tournament} />
        </TabContent>
      </NavTabs>
    </div>
  );
}

export default Tournament;
