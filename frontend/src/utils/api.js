import axios from "axios";

export const loadEvent = async (id) => {
  try {
    const result = await axios.get(`http://localhost:8080/api/events/${id}`);
    return result.data;
  } catch (error) {
    console.error("Error loading event:", error);
    throw error;
  }
};

export const loadEvents = async () => {
  try {
    const result = await axios.get("http://localhost:8080/api/events");
    return result.data;
  } catch (error) {
    console.error("Error loading event:", error);
    throw error;
  }
};

export const loadTournament = async (id) => {
  try {
    const result = await axios.get(
        `http://localhost:8080/api/tournaments/${id}`
    );
    return result.data;
  } catch (error) {
    console.error("Error loading tournament:", error);
    throw error;
  }
}

export const loadTournaments = async (id) => {
  try {
    const result = await axios.get(
        `http://localhost:8080/api/events/${id}/tournaments`
    );
    return result.data;
  } catch (error) {
    console.error("Error loading tournaments:", error);
    throw error;
  }
};

export const loadTournamentById = async (id) => {
  try {
    // const result = await
  } catch (error) {
    console.error("Error loading Tournament:", error);
    throw error;
  }
};

export const submitTournament = async (values) => {
  try {
    return await axios
        .post(
            "http://localhost:8080/api/manage/tournaments",
            {
              name: values.name,
              category: values.category,
              event_id: values.event_id,
            },
            {
              withCredentials: true,
            }
        );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loadPlayers = async () => {
  try {
    const result = await axios.get("http://localhost:8080/api/players");
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const loadEligiblePlayers = async (id) => {
  try {
    const result = await axios.get(
      `http://localhost:8080/api/tournaments/player/eligible/${id}`
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const addPlayerToTournament = async (playerId, tournamentId) => {
  try {
    await axios.patch(
      `http://localhost:8080/api/manage/tournaments/${tournamentId}/players/${playerId}`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    throw error;
  }
};

export const startTournament = async (tournamentId) => {
  try {
    const result = axios.patch(
      `http://localhost:8080/api/manage/tournaments/${tournamentId}/start`,
      {},
      {
        withCredentials: true,
      }
    ).then();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getGamesInTournament = async (tournamentId) => {
  try {
    const result = await axios.get(
      `http://localhost:8080/api/tournaments/${tournamentId}/games`
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const loadScheduledMatches = async(tournamentId) => {
  try {
    return await axios.get(
        `http://localhost:8080/api/tournaments/${tournamentId}/games?state=SCHEDULED`
    );
  } catch (error) {
    throw error;
  }
}

export const loadRunningMatches = async (tournamentId) =>{
  try {
    return await axios.get(
        `http://localhost:8080/api/tournaments/${tournamentId}/games?state=RUNNING`
    );
  } catch (error) {
    throw error;
  }
}

export const setStateGame = async (gameId, state) => {
  try {
    return await axios.patch(
        `http://localhost:8080/api/manage/games/${gameId}?state=${state}`,{},{
          withCredentials: true
        }
    );
  } catch (error) {
    throw error;
  }
}

export const setResultGame = async(gameId, gameResultRequest) => {
  try {
    return await axios.patch(
        `http://localhost:8080/api/manage/games/${gameId}/results`,gameResultRequest,{
          withCredentials: true
        }
    );
  } catch (error) {
    throw error;
  }
}

export const deleteEvent = (id) => {
  try {
    const result = axios.delete(
      `http://localhost:8080/api/manage/event/delete/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const deletePlayer = (idPlayer) =>{
  try {
    const result =  axios
        .delete(`http://localhost:8080/api/manage/players/${idPlayer}`, {
          withCredentials: true,
        });
    return result;
  } catch (error) {
    throw error;
  }
}
