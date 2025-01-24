import React from "react";
import { useAuth, isAuth, isMod } from "../../../providers/AuthProvider.jsx";
import {deletePlayer} from "../../../utils/api.js";
import {Button} from "@mui/material";

function DeletePlayerButton({ idPlayer, updateData }) {
  const { user } = useAuth();

  const handleDeletion = (e) => {
  deletePlayer(idPlayer).then((result) =>{
    updateData(idPlayer);
  })
  };
  return (
    <>
      {isAuth(user) && isMod(user) ? (
        <Button variant="contained" color="error" className="m-1" onClick={(e) => handleDeletion(e)}>
          {" "}
          <i className="bi bi-trash"></i>
        </Button>
      ) : (
        ""
      )}
    </>
  );
}

export default DeletePlayerButton;
