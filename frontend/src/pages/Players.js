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
              <b>Firstname: </b>
              {player.firstname + " "}
              <b>Lastname: </b>
              {player.lastname + " "}
              <b>Birthday: </b>
              {player.birthday}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Players;
