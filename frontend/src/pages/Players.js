import React, { useEffect, useState } from "react";
import AddPlayerButton from "../components/AdminOperations/AddPlayerButton";
import axios from "axios";

function Players() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    const result = await axios
      .get("http://localhost:8080/api/players")
      .then(function (response) {
        setPlayers(response.data);
        console.log(players);
      });
  };
  return (
    <div>
      <h3 className="h3">List of players</h3>
      <div className="container">
        <AddPlayerButton />
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
    </div>
  );
}

export default Players;
