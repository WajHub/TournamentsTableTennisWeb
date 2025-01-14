import React, { useState, useEffect } from "react";
import Search from "./Search";
import Player from "./Player";
import {useWindowSize} from "@uidotdev/usehooks";
import {Pagination, Stack, Typography} from "@mui/material";
import {AnimatePresence, motion} from "framer-motion";

function PlayerList({
    addingToTournament,
    idTournament,
    players,
    deletion,
    deletePlayer
}) {
  const [filteredPlayers, setFilteredPlayers] = useState(players);

    const [pagination, setPagination] = useState({
        size: useWindowSize(),
        numberOfElementsPerPage: 10,
        numberOfPages: 10,
        page: 1
    })

    const handleChangePage = (event, value) => {
        setPagination({
            ...pagination,
            page: value
        })
    };

    const countNumberOfPages = (numberOfElements, numberOfElementsPerPage) => Math.ceil(numberOfElements/numberOfElementsPerPage)

    useEffect(() => {
        setFilteredPlayers(players);
        setPagination({
            ...pagination,
            numberOfPages: countNumberOfPages(filteredPlayers.length, pagination.numberOfElementsPerPage)
        })
      }, [players]);

    useEffect(()=>{
        setPagination({
            ...pagination,
            numberOfPages: countNumberOfPages(filteredPlayers.length, pagination.numberOfElementsPerPage)
        })
    }, [useWindowSize().height])

  const filtering = (object, newSearch) => {
    const name = object.firstname + " " + object.lastname;
    return name.toLowerCase().includes(newSearch.toLowerCase());
  };


  return (
    <div className="container">
      <Search
        apiSet={players}
        setFilteredSet={setFilteredPlayers}
        filter={filtering}
      />
      <ul className="list-group list-group-flush mt-2">
          <AnimatePresence mode="popLayout">
            {filteredPlayers
                .slice((pagination.page-1)*pagination.numberOfElementsPerPage,
                    pagination.numberOfElementsPerPage + (pagination.page-1) * pagination.numberOfElementsPerPage)
                .map((player, index) => (
                    <motion.div key={player.id}
                         initial={{scale: 0, x: -10} }
                         animate={{scale: 1, x: 0}}
                         transition={{duration: 0.09 + index * 0.06}}
                    >
                      <Player
                        player={player}
                        key={player.id}
                        deletePlayer={deletePlayer}
                        deletion={deletion}
                        addingToTournament={addingToTournament}
                        idTournament={idTournament}

                        />
                    </motion.div>
            ))}
          </AnimatePresence>
      </ul>
        <Stack spacing={2} className="align-items-center">
            <Typography>Page: {pagination.page}</Typography>
            <Pagination count={pagination.numberOfPages} page={pagination.page} onChange={handleChangePage}/>
        </Stack>
      <></>
    </div>
  );
}

export default PlayerList;
