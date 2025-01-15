import React, {useContext, useEffect, useState} from 'react';
import Player from "../../../../shared/PlayerList/Player.jsx";
import {setStateGame} from "../../../../../utils/api.js";
import {TournamentsContext} from "../../../../../providers/TournamentsInEventProvider.jsx";

function GameScheduled({game}) {
    const [home, setHome] = useState(null);
    const [away, setAway] = useState(null);

    const {dispatch} = useContext(TournamentsContext)

    useEffect(() => {
        if(game) {
            setHome(game.participants[0]);
            setAway(game.participants[1]);
        }
    }, [game]);

    const handleStartGame = () => {
        setStateGame(game.id, "RUNNING").then(r => {
            dispatch({
                type:"updateStateGame",
                gameId:game.id,
                tournamentId: game.tournamentId,
                state:"RUNNING"
            })
        });
    }

    if(!game || !home || !away){
        return "loading...";
    }


    return (
        <div className="list-group-item justify-content-center">
            <li className="row align-items-center">
                <div className="">
                    {home.name} vs {away.name}
                </div>
                <div className="row p-2 justify-content-center">
                    <button className="col-sm-3 col-md-2 col-lg-1 btn btn-primary" onClick={(e) => {handleStartGame()}}>Start </button>
                </div>
            </li>
        </div>
    );
}

export default GameScheduled;