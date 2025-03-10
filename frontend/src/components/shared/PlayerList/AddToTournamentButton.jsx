import React, {useContext} from "react";
import { useAuth, isAuth, isMod } from "../../../providers/AuthProvider.jsx";
import { addPlayerToTournament } from "../../../utils/api.js";
import {TournamentsContext} from "../../../providers/TournamentsInEventProvider.jsx";
import {Button} from "@mui/material";

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
        <Button variant="outlined" color="primary" onClick={(e) => handleSubmit(e)}>
          {" "}
          <i className="bi bi-plus-circle-dotted"></i>
        </Button>
      ) : (
        ""
      )}
    </>
  );
}

export default AddToTournamentButton;
