import React, { useEffect, useState } from "react";
import AddPlayerButton from "./admin-components/AddPlayerButton.jsx";
import Overlay from "../shared/Overlay.jsx";
import FormPlayer from "./FormPlayer.jsx";
import { loadPlayers } from "../../utils/api.js";
import PlayerList from "../shared/PlayerList/PlayerList.jsx";
import DeletePlayerButton from "./admin-components/DeletePlayerButton.jsx";
import EditPlayerButton from "./admin-components/EditPlayerButton.jsx";

function Players() {
  const [players, setPlayers] = useState([]);
  const [displayFormPlayer, setDisplayFormPlayer] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);

  const fetchData = async () => {
    await loadPlayers().then((res) => {
      setPlayers(res);
    });
  };

  const addPlayer = (player, isNewPlayer) =>{
      if(isNewPlayer) {
          setPlayers([
              ...players,
              player
          ])
      }
      else{
          setPlayers(
              players.map(p => {
                  if(p.id === player.id) return player;
                  else return p;
              })
          )
      }

  }

  const editPlayer = (player) => {
      setEditingPlayer(player);
      setDisplayFormPlayer(true)
  }

  const deletePlayer = (idPlayer) =>{
      setPlayers(players.filter(p => p.id !== idPlayer))
  }

    useEffect(() =>{
        if(displayFormPlayer === false) setEditingPlayer(null);
    }, [displayFormPlayer])

  useEffect(() => {
    fetchData().then(r => {});
  }, []);

  return (
    <div className="mt-2">
      <h3 className="h3">List of players</h3>
      <AddPlayerButton handleClick={setDisplayFormPlayer} />
        <PlayerList
            players={players}
            overlayIsDisplayed={displayFormPlayer}
            renderEditButton={(player)=>
                <EditPlayerButton player={player} onEdit={editPlayer} />
            }
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
            <FormPlayer
                setDisplay={setDisplayFormPlayer}
                updateData={addPlayer}
                playerToUpdate={editingPlayer}
            />
      </Overlay>
    </div>
  );
}

export default Players;
