import React from "react";
import { useAuth, isAuth, isMod } from "../../providers/AuthProvider.jsx";
import axios from "axios";
import {deletePlayer} from "../../utils/api.js";

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
        <div className="btn btn-danger" onClick={(e) => handleDeletion(e)}>
          {" "}
          <i className="bi bi-trash"></i>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default DeletePlayerButton;
