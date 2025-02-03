import React, {useContext, useEffect, useState} from 'react';
import {loadTournaments, setStateGame} from "../../../../../utils/api.js";
import Overlay from "../../../../shared/Overlay.jsx";
import FormTournament from "../../../FormTournament.jsx";
import FormGameResult from "./FormGameResult.jsx";
import {TournamentsContext} from "../../../../../providers/TournamentsInEventProvider.jsx";
import {Button} from "@mui/material";

function GameRunning({game, eventId}) {

    const [home, setHome] = useState(null);
    const [away, setAway] = useState(null);

    const [isOverlayDisplayed, setOverlayDisplayed] = useState(false);

    const {dispatch} = useContext(TournamentsContext)

    useEffect(() => {
        if(game) {
            setHome(game.participants[0]);
            setAway(game.participants[1]);
        }
    }, [game]);

    const handleStop = () => {
        setStateGame(game.id, "SCHEDULED").then(r => {
            dispatch({
                type:"updateStateGame",
                gameId:game.id,
                tournamentId: game.tournamentId,
                state:"SCHEDULED"
            })
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
                    <Button color="success" variant="outlined" className="col-sm-3 col-md-2 col-lg-1 m-2" onClick={(e) => {
                        handleFinish()
                    }}>Finish
                    </Button>
                    <Button color="error" variant="outlined" className="col-sm-3 col-md-2 col-lg-1  m-2" onClick={(e) => {
                        handleStop()
                    }}>Stop
                    </Button>
                </div>
            </li>

            <Overlay
                isDisplayed={isOverlayDisplayed}
                setDisplay={setOverlayDisplayed}
            >
                <div className="flex-column">
                    <div className="container">
                        <div className="row font-weight-bold">
                            <div className="col-3  flex-fill">{home.name}</div>
                            <div className="col-3 text-center flex-fill">vs</div>
                            <div className="col-3 font-weight-bold flex-fill">{away.name}</div>
                        </div>
                    </div>
                    <div className="d-flex">

                    </div>
                    <FormGameResult setDisplay={setOverlayDisplayed} gameId={game.id} homeId={home.id} awayId={away.id}
                                    eventId={eventId}/>
                </div>
            </Overlay>
        </div>
    );
}

export default GameRunning;