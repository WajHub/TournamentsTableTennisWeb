import React, {useEffect, useState} from "react";
import {loadRunningMatches, loadScheduledMatches} from "../../../../utils/api.js";
import Player from "../../../shared/Player.jsx";
import GameScheduled from "./game/GameScheduled.jsx";
import GameRunning from "./game/GameRunning.jsx";


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
          <h3 className="h3 p-2">Scheduled Matches</h3>
          <ul className="list-group list-group-flush mt-2 p-2">
              {scheduledMatches.map((game) =>
                  (<GameScheduled key={game.id} game={game} refreshData={refreshData}/>)
              )}
          </ul>

          <h3 className="h3 p-2">Running Matches</h3>
          <ul className="list-group list-group-flush mt-2 p-2">
              {runningMatches.map((game) =>
                  (<GameRunning key={game.id} game={game} eventId={tournament.event_id} refreshData={refreshData}/>))}
          </ul>
      </div>
);
}

export default ManageRunningTournament;
