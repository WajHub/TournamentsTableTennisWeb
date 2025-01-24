import React, {useEffect, useState} from "react";
import NavTabs from "./tabs/NavTabs.jsx";
import TabTitle from "./tabs/TabTitle.jsx";
import TabContent from "./tabs/TabContent.jsx";
import {isMod, useAuth} from "../../providers/AuthProvider.jsx";
import ManageTournament from "./tournament/admin-components/ManageTournament.jsx";
import PlayerList from "../shared/PlayerList/PlayerList.jsx";
import Draw from "./tournament/Draw.jsx";
import {loadEvent, loadTournament, loadTournaments} from "../../utils/api.js";
import AddToTournamentButton from "../shared/PlayerList/AddToTournamentButton.jsx";

function Tournament({tournament}) {

  const { user, handleSignOut } = useAuth();

  if(tournament.playerDtoList===undefined) {
    console.log(tournament)
    return "Loading...";
  }

  return (
    <div className="container border rounded p-4 mt-2 shadow w-75">
      {" "}
      <NavTabs>
        {/*TITLE TABS */}
        <TabTitle
          key={`${tournament.id}_1`}
          title="player List"
          id={`${tournament.id}_1`}
          active={false}
        />
        <TabTitle
          key={`${tournament.id}_2`}
          title="Draws"
          id={`${tournament.id}_2`}
          active={true}
        />

        {/*TITLE TAB FOR ADMIN */}
        {(user && isMod(user)) ? (
          <TabTitle
            key={`${tournament.id}_-1`}
            title="manage"
            id={`${tournament.id}_-1`}
            active={false}
          />
        ) : (
          ""
        )}
        {(user && isMod(user)) ? (
          <TabContent
            key={`${tournament.id}_-1`}
            id={`${tournament.id}_-1`}
            active={false}
          >
            <ManageTournament tournament={tournament}/>
          </TabContent>
        ) : (
          ""
        )}

        {/*CONTENT TABS */}
        <TabContent
          key={`${tournament.id}_1`}
          id={`${tournament.id}_1`}
          active={false}
        >
          Player List {tournament.id}
          <PlayerList
            players={tournament.playerDtoList}
            renderEditButton={(player) => <></>}
            renderDeleteButton={(idPlayer) => <></>}
            renderAddToTournamentButton={(idPlayer) => <></>}
          />
        </TabContent>
        <TabContent
          key={`${tournament.id}_2`}
          id={`${tournament.id}_2`}
          active={true}
        >
          <Draw tournament={tournament} />
        </TabContent>
      </NavTabs>
    </div>
  );
}

export default Tournament;
