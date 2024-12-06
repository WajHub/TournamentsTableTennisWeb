import React, {useEffect, useState} from 'react';
import {loadTournaments, setStateGame} from "../../../utils/api.js";
import Overlay from "../../Other/Overlay.jsx";
import FormTournament from "../../Forms/FormTournament.jsx";
import FormGameResult from "../../Forms/FormGameResult.jsx";

function GameRunning({game, refreshData}) {

    const [home, setHome] = useState(null);
    const [away, setAway] = useState(null);

    const [isOverlayDisplayed, setOverlayDisplayed] = useState(false);

    useEffect(() => {
        if(game) {
            setHome(game.participants[0]);
            setAway(game.participants[1]);
        }
    }, [game]);

    const handleStop = () => {
        setStateGame(game.id, "SCHEDULED").then(r => {
            refreshData();
        });
    }

    const handleFinish = () => {
        setOverlayDisplayed(true);
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
                    <button className="col-sm-3 col-md-2 col-lg-1  btn btn-success m-2" onClick={(e) => {
                        handleFinish()
                    }}>Finish
                    </button>
                    <button className="col-sm-3 col-md-2 col-lg-1  btn btn-danger m-2" onClick={(e) => {
                        handleStop()
                    }}>Stop
                    </button>
                </div>
            </li>

            <Overlay
                isDisplayed={isOverlayDisplayed}
                setDisplay={setOverlayDisplayed}
            >
                <div className="row h4">
                    <div className="col-4 font-weight-bold">{home.name}</div>
                    <div className="col-4">vs</div>
                    <div className="col-4 font-weight-bold">{away.name}</div>

                </div>
                <FormGameResult setDisplay={setOverlayDisplayed} homeId={home.id} awayId={away.id}/>
            </Overlay>
        </div>
    );
}

export default GameRunning;