import React, { useEffect, useState } from "react";
import { loadEligiblePlayers } from "../../utils/api";
import PlayerList from "../Other/PlayerList";
import { startTournament } from "../../utils/api";

function ManageTournament({ tournament, fetchData_tournament }) {
  const [players, setPlayers] = useState([]);

  const fetchData = async (id) => {
    await loadEligiblePlayers(id).then((res) => {
      setPlayers(res);
    });
  };

  useEffect(() => {
    fetchData(tournament.id);
  }, []);

  const handleStartTournament = (id) => {
    startTournament(id).then((response) => {
      if (response.status == 201) fetchData_tournament();
    });
  };

  return tournament.running ? (
    "Is Running"
  ) : (
    <div>
      List of players to Add:
      <PlayerList
        addingToTournament={true}
        idTournament={tournament.id}
        deletion={false}
        players={players}
        loadData={() => fetchData(tournament.id)}
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
