import React from "react";
import { useAuth, isAuth, isMod } from "../../auth/AuthProvider.js";
import axios from "axios";

function DeletePlayerButton({ idPlayer, loadPlayers }) {
  const { user } = useAuth();

  const handleDeletion = () => {
    axios
      .delete(`http://localhost:8080/api/manage/player/delete/${idPlayer}`, {
        withCredentials: true,
      })
      .then((response) => {
        loadPlayers();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      {isAuth(user) && isMod(user) ? (
        <div className="btn btn-danger" onClick={(e) => handleDeletion()}>
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
