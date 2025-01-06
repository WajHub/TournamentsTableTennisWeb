import React, {useContext, useEffect, useState} from "react";
import { loadEligiblePlayers } from "../../../../utils/api.js";
import PlayerList from "../../../shared/PlayerList.jsx";
import { startTournament } from "../../../../utils/api.js";
import ManageRunningTournament from "./ManageRunningTournament.jsx";
import {TournamentsContext} from "../../../../providers/TournamentsInEventProvider.jsx";

function ManageTournament({ tournament }) {
  const [players, setPlayers] = useState([]);
  const {dispatch} = useContext(TournamentsContext)

  const fetchData = async () => {
    await loadEligiblePlayers(tournament.id).then((res) => {
      setPlayers(res);
    });
  };

  useEffect(() => {
    if(tournament.id) fetchData();
  }, [tournament]);

  const handleStartTournament = (id) => {
    startTournament(id).then(r => {
        dispatch({
            type: "updateTournament",
            data: r.data
        })
    });
  };

  return tournament.running ? (
    <ManageRunningTournament tournament={tournament} refreshData={()=>{}}/>
  ) : (
    <div>
      List of players to Add:
      <PlayerList
        addingToTournament={true}
        idTournament={tournament.id}
        deletion={false}
        players={players}
      />
      <button
        className="btn btn-success mt-3"
        onClick={(e) => handleStartTournament(tournament.id)}
      >
        Start Tournament
      </button>
    </div>
  );
}

export default ManageTournament;
