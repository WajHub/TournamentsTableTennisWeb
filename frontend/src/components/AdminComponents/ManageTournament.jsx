import React, { useEffect, useState } from "react";
import { loadEligiblePlayers } from "../../utils/api";
import PlayerList from "../Other/PlayerList";
import { startTournament } from "../../utils/api";
import ManageRunningTournament from "./ManageRunningTournament";

function ManageTournament({ tournament, refreshData }) {
  const [players, setPlayers] = useState([]);

  const fetchData = async (id) => {
    await loadEligiblePlayers(id).then((res) => {
      setPlayers(res);
    });
  };
  useEffect(() => {
    if(tournament.id) fetchData(tournament.id);
  }, [tournament]);

  const handleStartTournament = (id) => {
    startTournament(id).then(r => {
        fetchData(id);
        refreshData();
    });
  };

  return tournament.running ? (
    <ManageRunningTournament />
  ) : (
    <div>
      List of players to Add:
      <PlayerList
        addingToTournament={true}
        idTournament={tournament.id}
        deletion={false}
        players={players}
        loadData={() => {
          fetchData(tournament.id);
        }}
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
