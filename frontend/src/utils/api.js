import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
console.log("TEEEEST", import.meta.env)

export const loadEvent = async (id) => {
  try {
    const result = await axios.get(`${apiUrl}/api/events/${id}`);
    return result.data;
  } catch (error) {
    console.error("Error loading event:", error);
    throw error;
  }
};

export const loadEvents = async () => {
  try {
    const result = await axios.get(`${apiUrl}/api/events`);
    return result.data;
  } catch (error) {
    console.error("Error loading event:", error);
    throw error;
  }
};

export const loadTournament = async (id) => {
  try {
    const result = await axios.get(
        `${apiUrl}/api/tournaments/${id}`
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
        `${apiUrl}/api/events/${id}/tournaments`
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
            `${apiUrl}/api/manage/tournaments`,
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
    const result = await axios.get(`${apiUrl}/api/players`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const loadEligiblePlayers = async (id) => {
  try {
    const result = await axios.get(
      `${apiUrl}/api/tournaments/player/eligible/${id}`
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const loadCategories = async () => {
  try {
    const result = await axios.get(
        `${apiUrl}/api/categories`
    );
    return result.data;
  } catch (error) {
    throw error;
  }
}

export const addPlayerToTournament = async (playerId, tournamentId) => {
  try {
    const result = await axios.patch(
      `${apiUrl}/api/manage/tournaments/${tournamentId}/players/${playerId}`,
      {},
      {
        withCredentials: true,
      }
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const startTournament = async (tournamentId) => {
  try {
    const result = axios.patch(
      `${apiUrl}/api/manage/tournaments/${tournamentId}/start`,
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
      `${apiUrl}/api/tournaments/${tournamentId}/games`
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const loadScheduledMatches = async(tournamentId) => {
  try {
    return await axios.get(
        `${apiUrl}/api/tournaments/${tournamentId}/games?state=SCHEDULED`
    );
  } catch (error) {
    throw error;
  }
}

export const loadRunningMatches = async (tournamentId) =>{
  try {
    return await axios.get(
        `${apiUrl}/api/tournaments/${tournamentId}/games?state=RUNNING`
    );
  } catch (error) {
    throw error;
  }
}

export const setStateGame = async (gameId, state) => {
  try {
    return await axios.patch(
        `${apiUrl}/api/manage/games/${gameId}?state=${state}`,{},{
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
        `${apiUrl}/api/manage/games/${gameId}/results`,gameResultRequest,{
          withCredentials: true
        }
    );
  } catch (error) {
    throw error;
  }
}

export const updatePlayer = (idPlayer, playerDto) => {
  try {
    const result =  axios
        .patch(
            `${apiUrl}/api/manage/players/${idPlayer}`,
            playerDto,
            {withCredentials: true}
          );
    return result;
  } catch (error) {
    throw error;
  }
}

export const deletePlayer = (idPlayer) =>{
  try {
    const result =  axios
        .delete(`${apiUrl}/api/manage/players/${idPlayer}`, {
          withCredentials: true,
        });
    return result;
  } catch (error) {
    throw error;
  }
}

export const updateEvent = async (idEvent, event) => {
  try{
    console.log(event)
    const result =
        axios.patch(`${apiUrl}/api/manage/events/${idEvent}`,
            event,
            {withCredentials: true}
        )
    return result
  }catch(error){}
}

export const deleteEvent = (idEvent) => {
  try{
    const result =
        axios.delete(`${apiUrl}/api/manage/events/${idEvent}`,{
          withCredentials: true
        })
    return result
  }catch(error){

  }
}

export const loadUsers = () => {
  try{
    const result =
        axios.get(`${apiUrl}/api/admin_manage/users`,{
          withCredentials: true
        })
    return result
  }catch(error){
  }
}

export const deleteUser = (idUser) => {
  try{
    const result =
        axios.delete(`${apiUrl}/api/admin_manage/users/${idUser}`,{
          withCredentials: true
        })
    return result
  }catch(error){
  }
}

export const editRole = (idUser, newRole) => {
  try{
    const result =
        axios.patch(`${apiUrl}/api/admin_manage/users/${idUser}/${newRole}`,
            {withCredentials: true})
    return result
  }catch(error){
  }
}

// Auth
export const refreshToken = () => {
  try {
      axios.post(`${apiUrl}/auth/refreshtoken`, {},{
        withCredentials: true,
      }).then(r => {})
  } catch(error) {
    // throw error;
  }
}

export const confirmEmail = (token) => {
  try {
    return axios.post(`${apiUrl}/auth/confirm_email?token=${token}`, {}, {
      withCredentials: true
    });
  } catch(error) {
    throw error;
  }
}

export const changePassword = (changePasswordRequest) => {
  try {
    return axios.patch(`${apiUrl}/auth/new_password`,
        changePasswordRequest,
        {withCredentials: true}
    );
  } catch(error) {
    throw error;
  }
}

export const resetPassword = (email) => {
  try {
    return axios.post(`${apiUrl}/auth/reset_password`,
        {email},
        {withCredentials: true}
    );
  } catch(error) {
    throw error;
  }
}

export const resetPassword_confirm = (changePasswordByEmailRequest, token) => {
  try {
    return axios.patch(`${apiUrl}/auth/reset_password/confirm?token=${token}`,
        changePasswordByEmailRequest,
        {withCredentials: true}
    );
  } catch(error) {
    throw error;
  }
}

export const subscribe = (idEvent) => {
  try {
    return axios.patch(`${apiUrl}/api/users/notifications/${idEvent}/subscribe`,
        {},
        {withCredentials: true}
    );
  } catch(error) {
    throw error;
  }
}

export const unsubscribe = (idEvent) => {
  try {
    return axios.patch(`${apiUrl}/api/users/notifications/${idEvent}/unsubscribe`,
        {},
        {withCredentials: true}
    );
  } catch(error) {
    throw error;
  }
}



