import React from "react";
import NavTabs from "../Tabs/NavTabs";
import TabTitle from "../Tabs/TabTitle";
import TabContent from "../Tabs/TabContent";
import { useAuth } from "../../auth/AuthProvider";
import ManageTournament from "../AdminComponents/ManageTournament";
import PlayerList from "../Other/PlayerList";

function Tournament({ tournament, fetchData }) {
  const { user, handleSignOut } = useAuth();

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

        {/*TITLE TAB FOR ADMIN */}
        {user ? (
          <TabTitle
            key={`${tournament.id}_-1`}
            title="manage"
            id={`${tournament.id}_-1`}
            active={false}
          />
        ) : (
          ""
        )}
        {user ? (
          <TabContent
            key={`${tournament.id}_-1`}
            id={`${tournament.id}_-1`}
            active={false}
          >
            <ManageTournament
              tournament={tournament}
              fetchData_tournament={fetchData}
            />
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
            deletion={false}
            loadData={false}
          />
        </TabContent>
      </NavTabs>
    </div>
  );
}

export default Tournament;
