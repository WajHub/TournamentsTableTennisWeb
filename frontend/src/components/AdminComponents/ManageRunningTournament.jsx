import React, {useEffect, useState} from "react";
import {loadRunningMatches, loadScheduledMatches} from "../../utils/api.js";
import Player from "../Other/Player.jsx";
import GameScheduled from "./Game/GameScheduled.jsx";


function ManageRunningTournament({tournament, refreshData}) {
  const [scheduledMatches, setScheduledMatches] = useState([]);
  const [runningMatches, setRunningMatches] = useState([]);

  useEffect(() => {
    if(tournament.id) fetchData(tournament.id);
  }, [tournament]);

  const fetchData = async  (tournamentId) => {
    loadScheduledMatches(tournamentId).then(r => {
      setScheduledMatches(r.data);
    });
    loadRunningMatches(tournamentId).then(r => {
      setRunningMatches(r.data);
    })
  }

  return (
      <div className="container">
        <h3 className="h3">Scheduled Matches</h3>
        <ul className="list-group list-group-flush mt-2">
            {scheduledMatches.map((game) =>
                (<GameScheduled key={game.id} game={game}/>)
            )}
        </ul>

        <h3 className="h3">Running Matches</h3>
        {runningMatches.map((match) => {
          return (<div>{match.id} </div>)
        })}
      </div>
  );
}

export default ManageRunningTournament;
