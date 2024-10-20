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
