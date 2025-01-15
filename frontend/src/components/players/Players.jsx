import React, { useEffect, useState } from "react";
import AddPlayerButton from "./admin-components/AddPlayerButton.jsx";
import Overlay from "../shared/Overlay.jsx";
import FormPlayer from "./FormPlayer.jsx";
import { loadPlayers } from "../../utils/api.js";
import PlayerList from "../shared/PlayerList/PlayerList.jsx";
import DeletePlayerButton from "../shared/PlayerList/DeletePlayerButton.jsx";

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
    fetchData().then(r => {});
  }, []);

  return (
    <div>
      <h3 className="h3">List of players</h3>
      <AddPlayerButton handleClick={setDisplayFormPlayer} />
        <PlayerList
            players={players}
            renderDeleteButton={(idPlayer) =>
                <DeletePlayerButton idPlayer={idPlayer} updateData={deletePlayer}/>
            }
            renderAddToTournamentButton={() =>
                <></>
            }
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
