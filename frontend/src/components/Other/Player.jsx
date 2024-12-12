import React from "react";
import DeletePlayerButton from "../AdminComponents/DeletePlayerButton";
import AddPlayerToTournamentButton from "../AdminComponents/AddPlayerToTournamentButton.jsx";

/* deletetion, addingToTournament - operation on player*/

function Player({
  player,
  deletion,
  loadData,
    refreshData,
  addingToTournament,
  idTournament,
}) {
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
            {player.playerCategoryDtoList && (
              <>
                <b>Categories: </b>
                <i>|</i>
                {player.playerCategoryDtoList.map((category, index) => (
                  <i key={index}> {category.categoryDto.name + "|"} </i>
                ))}
              </>
            )}
          </div>
          {deletion && (
            <div className="col-1">
              <DeletePlayerButton idPlayer={player.id} loadData={loadData} />
            </div>
          )}
          {addingToTournament && (
            <div className="col-1">
              <AddPlayerToTournamentButton
                idPlayer={player.id}
                loadData={loadData}
                refreshData={refreshData}
                idTournament={idTournament}
              />
            </div>
          )}
        </li>
      </div>
    </div>
  );
}

export default Player;
