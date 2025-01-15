import React from "react";

function Player({
    player,
    children
}) {

    return (
        <div key={player.id} className="list-group-item justify-content-center">
            <li className="row align-items-center">
                <div className="col-11">
                    <b>Player: </b>
                    {`${player.firstname} ${player.lastname} (${player.date}) `}
                    <b>Categories: </b>
                    {player.playerCategoryDtoList.map(({ categoryDto, points }, index) => (
                        <span key={index}>
                            {`| ${categoryDto.name} (points: ${points}) `}
                        </span>
                    ))}
                    <i>|</i>
                </div>
                <div className="col-1">{children}</div>
            </li>
        </div>
    );
}

export default Player;
