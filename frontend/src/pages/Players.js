import React, { useEffect, useState } from "react";
import AddPlayerButton from "../components/AdminComponents/AddPlayerButton";
import Overlay from "../components/Other/Overlay";
import FormPlayer from "../components/Forms/FormPlayer";
import { loadPlayers } from "../utils/api";
import PlayerList from "../components/Other/PlayerList";

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
      <PlayerList deletion={true} players={players} loadData={fetchData} />

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
