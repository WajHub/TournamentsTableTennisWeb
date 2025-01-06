import React, {useContext, useEffect, useState} from "react";
import {loadRunningMatches, loadScheduledMatches} from "../../../../utils/api.js";
import Player from "../../../shared/Player.jsx";
import GameScheduled from "./game/GameScheduled.jsx";
import GameRunning from "./game/GameRunning.jsx";
import {TournamentsContext} from "../../../../providers/TournamentsInEventProvider.jsx";


function ManageRunningTournament({tournament}) {
    const [scheduledMatches, setScheduledMatches] = useState([]);
    const [runningMatches, setRunningMatches] = useState([]);

    useEffect(() => {
        setScheduledMatches(tournament.games.filter((game) => game.state === "SCHEDULED"));
        setRunningMatches(tournament.games.filter((game) => game.state === "RUNNING"));
    }, [tournament.games]);

  return (
      <div className="container">
          <h3 className="h3 p-2">Scheduled Matches</h3>
          <ul className="list-group list-group-flush mt-2 p-2">
              {scheduledMatches.map((game) =>
                  (<GameScheduled key={game.id} game={game} />)
              )}
          </ul>

          <h3 className="h3 p-2">Running Matches</h3>
          <ul className="list-group list-group-flush mt-2 p-2">
              {runningMatches.map((game) =>
                  (<GameRunning key={game.id} game={game} eventId={tournament.event_id} />))}
          </ul>
      </div>
);
}

export default ManageRunningTournament;
