import React, { useEffect, useState } from "react";
import AddPlayerButton from "../components/AdminComponents/AddPlayerButton";

import Overlay from "../components/Overlay";
import FormPlayer from "../components/Forms/FormPlayer";
import Player from "../components/Players/Player";
import axios from "axios";

function Players() {
  const [players, setPlayers] = useState([]);
  const [displayFormPlayer, setDisplayFormPlayer] = useState(false);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    await axios
      .get("http://localhost:8080/api/players")
      .then(function (response) {
        setPlayers(response.data);
      });
  };
  return (
    <div>
      <h3 className="h3">List of players</h3>
      <div className="container">
        <AddPlayerButton hanldeClick={setDisplayFormPlayer} />
        <ul className="list-group list-group-flush">
          {players.map((player, index) => (
            <Player player={player} key={index} loadPlayers={loadPlayers} />
          ))}
        </ul>
      </div>
      <Overlay
        isDisplayed={displayFormPlayer}
        setDisplay={setDisplayFormPlayer}
      >
        <FormPlayer setDisplay={setDisplayFormPlayer} loadData={loadPlayers} />
      </Overlay>
    </div>
  );
}

export default Players;
