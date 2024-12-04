import React, {useEffect, useState} from 'react';
import Player from "../../Other/Player.jsx";

function GameScheduled({game}) {
    const [home, setHome] = useState(null);
    const [away, setAway] = useState(null);

    useEffect(() => {
        if(game) {
            setHome(game.participants[0]);
            setAway(game.participants[0]);
        }
    }, [game]);

    if(!game || !home || !away){
        return "loading...";
    }

    return (
        <div className="list-group-item justify-content-center">
            <li>
                <div className="col-10">
                    {home.name} vs {away.name}
                </div>

            </li>
        </div>
    );
}

export default GameScheduled;