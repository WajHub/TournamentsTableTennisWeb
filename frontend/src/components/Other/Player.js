import React from "react";
import DeletePlayerButton from "../AdminComponents/DeletePlayerButton";

function Player({ player, deletion, loadData }) {
  return (
    <div key={player.id}>
      <div className="list-group-item justify-content-center">
        <li key={player.id} className="row align-items-center ">
          <div className="col-11">
            <b>Player: </b>
            {player.firstname +
              " " +
              player.lastname +
              " (" +
              player.date +
              ") "}
            <b>Categories: </b>
            <i>|</i>
            {player.playerCategoryDtoList.map((category, index) => (
              <i key={index}> {category.categoryDto.name + "|"} </i>
            ))}
          </div>
          {deletion && (
            <div className="col-1">
              <DeletePlayerButton idPlayer={player.id} loadData={loadData} />
            </div>
          )}
        </li>
      </div>
    </div>
  );
}

export default Player;
