import React, {useEffect, useState} from 'react';
import Player from "../../Other/Player.jsx";
import {setStateGame} from "../../../utils/api.js";

function GameScheduled({game, refreshData}) {
    const [home, setHome] = useState(null);
    const [away, setAway] = useState(null);

    useEffect(() => {
        if(game) {
            setHome(game.participants[0]);
            setAway(game.participants[1]);
        }
    }, [game]);

    const handleClick = () => {
        setStateGame(game.id, "RUNNING").then(r => {
            refreshData();
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
                    <button className="col-sm-3 col-md-2 col-lg-1 btn btn-primary" onClick={(e) => {handleClick()}}>Start </button>
                </div>
            </li>
        </div>
    );
}

export default GameScheduled;