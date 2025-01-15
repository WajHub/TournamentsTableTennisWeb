import React, {useContext} from "react";
import { useAuth, isAuth, isMod } from "../../../providers/AuthProvider.jsx";
import axios from "axios";
import { addPlayerToTournament } from "../../../utils/api.js";
import {TournamentsContext} from "../../../providers/TournamentsInEventProvider.jsx";

function AddToTournamentButton({ idPlayer, idTournament }) {

  const { user } = useAuth();
  const {dispatch} = useContext(TournamentsContext)

  const handleSubmit = async (e) => {
    addPlayerToTournament(idPlayer, idTournament).then((response) => {
      dispatch({
        type: "updateTournament",
        data: response
      })
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

export default AddToTournamentButton;
