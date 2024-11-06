import React, { useEffect, useState } from "react";
import { loadEligiblePlayers } from "../../utils/api";
import PlayerList from "../Other/PlayerList";

function ManageTournament({ idTournament }) {
  const [players, setPlayers] = useState([]);

  const fetchData = async (id) => {
    await loadEligiblePlayers(id).then((res) => {
      setPlayers(res);
    });
  };

  useEffect(() => {
    fetchData(idTournament);
  }, []);

  return (
    <div>
      List of players to Add:
      <PlayerList
        addingToTournament={true}
        idTournament={idTournament}
        deletion={false}
        players={players}
        loadData={() => fetchData(idTournament)}
      />
    </div>
  );
}

export default ManageTournament;
