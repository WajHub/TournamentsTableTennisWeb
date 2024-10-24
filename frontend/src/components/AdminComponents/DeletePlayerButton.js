import React from "react";
import { useAuth, isAuth, isMod } from "../../auth/AuthProvider.js";
import axios from "axios";

function DeletePlayerButton({ idPlayer, loadData }) {
  const { user } = useAuth();

  const handleDeletion = (e) => {
    axios
      .delete(`http://localhost:8080/api/manage/player/delete/${idPlayer}`, {
        withCredentials: true,
      })
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
