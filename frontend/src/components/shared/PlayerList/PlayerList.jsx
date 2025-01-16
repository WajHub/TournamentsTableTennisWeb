import React, { useState, useEffect } from "react";
import SearchType from "../SearchType.jsx";
import Player from "./Player.jsx";
import {useWindowSize} from "@uidotdev/usehooks";
import {Autocomplete, Pagination, Stack, TextField, Typography} from "@mui/material";
import {AnimatePresence, motion} from "framer-motion";
import {loadCategories} from "../../../utils/api.js";

function PlayerList({
    players,
    renderDeleteButton,
    renderAddToTournamentButton
}) {

    const [filteredPlayers, setFilteredPlayers] = useState(players);

    const [categories, setCategories] = useState([]);

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
        loadCategories().then((result)=>{
            setCategories(result)})
    }, []);

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

    const filteringOnCategory = (event, value) => {
        const playersInCategory = players.filter(
            (player)=> playerIsInCategory(player, value)
        );
        const newFilteredPlayers = filteredPlayers.filter(
            (player) => playersInCategory.includes(player)
        )
        setFilteredPlayers(newFilteredPlayers);
    }

    const playerIsInCategory = (player, value) =>{
        const result = player.playerCategoryDtoList.find(
            (category) => (category.categoryDto.name === value.name)
        )
        return result !== undefined;
    }

  return (
    <div className="container">

      <div className="d-flex justify-content-center flex-wrap align-items-center">
          <SearchType
            className="m-2"
            apiSet={players}
            setFilteredSet={setFilteredPlayers}
            filter={filtering}
          />
          <Autocomplete
            className="m-2"
            options={categories.sort((a, b) => -b.gender.localeCompare(a.gender))}
            groupBy={(option) => option.gender}
            getOptionLabel={(option) => option.name}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="With categories" />}
            onChange={filteringOnCategory}
          />
      </div>

      <ul className="list-group list-group-flush mt-2">
          <AnimatePresence mode="popLayout">
            {filteredPlayers
                .slice((pagination.page-1)*pagination.numberOfElementsPerPage,
                    pagination.numberOfElementsPerPage + (pagination.page-1) * pagination.numberOfElementsPerPage)
                .map((player, index) => (
                    <motion.div
                        key={player.id}
                        initial={{scale: 0, x: -10} }
                        animate={{scale: 1, x: 0}}
                        transition={{duration: 0.09 + index * 0.06}}
                    >
                      <Player player={player}>
                          {renderDeleteButton(player.id)}
                          {renderAddToTournamentButton(player.id)}
                      </Player>
                    </motion.div>
            ))}
          </AnimatePresence>
      </ul>

        <Stack spacing={2} className="align-items-center">
            <Typography>Page: {pagination.page}</Typography>
            <Pagination count={pagination.numberOfPages} page={pagination.page} onChange={handleChangePage}/>
        </Stack>

    </div>
  );
}

export default PlayerList;
