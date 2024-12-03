import axios from "axios";

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
    console.error("Error loading events:", error);
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
    await axios.put(
      `http://localhost:8080/api/manage/tournaments/add/player?playerId=${playerId}&tournamentId=${tournamentId}`,
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
      `http://localhost:8080/api/manage/start/${tournamentId}`,
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
      `http://localhost:8080/api/games/${tournamentId}`
    );
    return result;
  } catch (error) {
    throw error;
  }
};

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
