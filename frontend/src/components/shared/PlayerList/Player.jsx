import React from "react";

function Player({
    player,
    children
}) {

    return (
        <li key={player.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <b>Player: </b>
                {`${player.firstname} ${player.lastname} (${player.date}) `}
                <b>Categories: </b>
                {player.playerCategoryDtoList.map(({categoryDto, points}, index) => (
                    <span key={index}>
                        {`| ${categoryDto.name} (points: ${points}) `}
                    </span>
                ))}
                <i>|</i>
            </div>
            <div>{children}</div>
        </li>
    );
}

export default Player;
