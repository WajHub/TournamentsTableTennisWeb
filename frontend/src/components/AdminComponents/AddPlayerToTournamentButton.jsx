import React from "react";
import { useAuth, isAuth, isMod } from "../../auth/AuthProvider.jsx";
import axios from "axios";
import { addPlayerToTournament } from "../../utils/api.js";

function AddPlayerToTournamentButton({ idPlayer, loadData, idTournament }) {
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    await addPlayerToTournament(idPlayer, idTournament);
    loadData();
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
