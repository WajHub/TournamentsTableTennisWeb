import axios from "axios";

export const loadTournaments = async (id) => {
  try {
    const result = await axios.get(
      `http://localhost:8080/api/tournaments/${id}`
    );
    return result.data;
  } catch (error) {
    console.error("Error loading tournaments:", error);
    throw error;
  }
};

export const loadEvent = async (id) => {
  try {
    const result = await axios.get(`http://localhost:8080/api/event/${id}`);
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
      `http://localhost:8080/api/manage/add/player/tournament?playerId=${playerId}&tournamentId=${tournamentId}`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    throw error;
  }
};
