import React, { useEffect, useState } from "react";
import AddPlayerButton from "./admin-components/AddPlayerButton.jsx";
import Overlay from "../shared/Overlay.jsx";
import FormPlayer from "./FormPlayer.jsx";
import { loadPlayers } from "../../utils/api.js";
import PlayerList from "../shared/PlayerList.jsx";

function Players() {
  const [players, setPlayers] = useState([]);
  const [displayFormPlayer, setDisplayFormPlayer] = useState(false);

  const fetchData = async () => {
    await loadPlayers().then((res) => {
      setPlayers(res);
    });
  };

  const addPlayer = (player) =>{
      setPlayers([
          ...players,
          player
      ])
  }

  const deletePlayer = (idPlayer) =>{
      setPlayers(players.filter(p => p.id !== idPlayer))
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h3 className="h3">List of players</h3>
      <AddPlayerButton hanldeClick={setDisplayFormPlayer} />
      <PlayerList
        addingToTournament={false}
        deletion={true}
        deletePlayer={deletePlayer}
        players={players}
        loadData={fetchData}
      />

      <Overlay
        isDisplayed={displayFormPlayer}
        setDisplay={setDisplayFormPlayer}
      >
        <FormPlayer setDisplay={setDisplayFormPlayer} updateData={addPlayer} />
      </Overlay>
    </div>
  );
}

export default Players;
