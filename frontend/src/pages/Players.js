import React, { useEffect, useState } from "react";
import AddPlayerButton from "../components/AdminComponents/AddPlayerButton";
import Overlay from "../components/Other/Overlay";
import Search from "../components/Other/Search";
import FormPlayer from "../components/Forms/FormPlayer";
import Player from "../components/PagePlayers/Player";
import { loadPlayers } from "../utils/api";

function Players() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [displayFormPlayer, setDisplayFormPlayer] = useState(false);

  const fetchData = async () => {
    const playersLoaded = await loadPlayers();
    setPlayers(playersLoaded);
    setFilteredPlayers(playersLoaded);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtering = (object, newSearch) => {
    const name = object.firstname + " " + object.lastname;
    return name.toLowerCase().includes(newSearch.toLowerCase());
  };

  return (
    <div>
      <h3 className="h3">List of players</h3>
      <div className="container">
        <Search
          apiSet={players}
          setFilteredSet={setFilteredPlayers}
          filter={filtering}
        />
        <AddPlayerButton hanldeClick={setDisplayFormPlayer} />
        <ul className="list-group list-group-flush">
          {filteredPlayers.map((player, index) => (
            <Player player={player} key={index} loadPlayers={fetchData} />
          ))}
        </ul>
      </div>
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
