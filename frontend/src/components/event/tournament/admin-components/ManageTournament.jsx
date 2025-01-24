import React, {useContext, useEffect, useState} from "react";
import { loadEligiblePlayers } from "../../../../utils/api.js";
import PlayerList from "../../../shared/PlayerList/PlayerList.jsx";
import { startTournament } from "../../../../utils/api.js";
import ManageRunningTournament from "./ManageRunningTournament.jsx";
import {TournamentsContext} from "../../../../providers/TournamentsInEventProvider.jsx";
import DeletePlayerButton from "../../../players/admin-components/DeletePlayerButton.jsx";
import AddToTournamentButton from "../../../shared/PlayerList/AddToTournamentButton.jsx";
import {Button} from "@mui/material";

function ManageTournament({ tournament }) {
  const [players, setPlayers] = useState([]);
  const {dispatch} = useContext(TournamentsContext)

  const fetchData = async () => {
    await loadEligiblePlayers(tournament.id).then((res) => {
      setPlayers(res);
    });
  };

  useEffect(() => {
    if(tournament.id) fetchData();
  }, [tournament]);

  const handleStartTournament = (id) => {
    startTournament(id).then(r => {
        dispatch({
            type: "updateTournament",
            data: r.data
        })
    });
  };

  return tournament.running ? (
    <ManageRunningTournament tournament={tournament} refreshData={()=>{}}/>
  ) : (
    <div>
      List of players to Add:
      <PlayerList
        players={players}
        renderEditButton={(player) => <></>}
        renderDeleteButton={(idPlayer) =>
            <></>
        }
        renderAddToTournamentButton={(idPlayer) =>
            <AddToTournamentButton
                idPlayer={idPlayer}
                idTournament={tournament.id}
            />
        }
      />
      <Button
        variant="outlined" color="primary"
        className="mt-3"
        onClick={(e) => handleStartTournament(tournament.id)}
      >
        Start Tournament
      </Button>
    </div>
  );
}

export default ManageTournament;
