import React from "react";
import { useAuth, isAuth, isMod } from "../../auth/AuthProvider.jsx";
import axios from "axios";
import { addPlayerToTournament } from "../../utils/api.js";

function AddPlayerToTournamentButton({ idPlayer, loadData }) {
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    axios
      .put(
        `http://localhost:8080/api/manage/add/player/tournament?playerId=${idPlayer}&tournamentId=3`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        loadData();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      {isAuth(user) && isMod(user) ? (
        <div className="btn btn-primary" onClick={(e) => handleSubmit(e)}>
          {" "}
          <i className="bi bi-plus-circle-dotted"></i>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default AddPlayerToTournamentButton;
