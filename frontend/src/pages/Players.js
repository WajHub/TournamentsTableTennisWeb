import React, { useEffect, useState } from "react";
import AddPlayerButton from "../components/Admin/AddPlayerButton";
import Overlay from "../components/Overlay";
import FormPlayer from "../components/Admin/Forms/FormPlayer";
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
            <li key={player.id} className="list-group-item">
              <b>Player: </b>
              {player.firstname +
                " " +
                player.lastname +
                " (" +
                player.date +
                ") "}
              <b>Categories: </b>
              <i>|</i>
              {player.playerCategoryDtoList.map((category, index) => (
                <i key={index}> {category.categoryDto.name + "|"} </i>
              ))}
            </li>
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
