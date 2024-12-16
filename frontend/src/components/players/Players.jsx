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
        players={players}
        loadData={fetchData}
      />

      <Overlay
        isDisplayed={displayFormPlayer}
        setDisplay={setDisplayFormPlayer}
      >
        <FormPlayer setDisplay={setDisplayFormPlayer} loadData={fetchData} />
      </Overlay>
    </div>
  );
}

export default Players;
