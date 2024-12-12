import React from "react";
import { useAuth, isAuth, isMod } from "../../auth/AuthProvider.jsx";
import axios from "axios";
import {deletePlayer} from "../../utils/api.js";

function DeletePlayerButton({ idPlayer, loadData }) {
  const { user } = useAuth();

  const handleDeletion = (e) => {
  deletePlayer(idPlayer).then((result) =>{
    loadData();
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
