import React, { useEffect, useState } from "react";

function ManageTournament() {
  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    // await axios
    //   .get("http://localhost:8080/api/players")
    //   .then(function (response) {
    //     setPlayers(response.data);
    //   });
  };
  return <div>...</div>;
}

export default ManageTournament;
