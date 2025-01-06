import React, { useState, useEffect } from "react";
import Search from "./Search";
import Player from "./Player";

function PlayerList({
  addingToTournament,
  idTournament,
  players,
  deletion,
  deletePlayer,
  loadData,
    refreshData
}) {
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  useEffect(() => {
    setFilteredPlayers(players);
  }, [players]);

  const filtering = (object, newSearch) => {
    const name = object.firstname + " " + object.lastname;
    return name.toLowerCase().includes(newSearch.toLowerCase());
  };

  return (
    <div className="container">
      <Search
        apiSet={players}
        setFilteredSet={setFilteredPlayers}
        filter={filtering}
      />
      <ul className="list-group list-group-flush mt-2">
        {filteredPlayers.map((player, index) => (
          <Player
            player={player}
            key={index}
            deletePlayer={deletePlayer}
            loadData={loadData}
            refreshData={refreshData}
            deletion={deletion}
            addingToTournament={addingToTournament}
            idTournament={idTournament}
          ></Player>
        ))}
      </ul>
      <></>
    </div>
  );
}

export default PlayerList;
