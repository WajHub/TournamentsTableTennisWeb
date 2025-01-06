import React, {createContext, useEffect, useReducer} from "react";
import tournament from "../components/event/Tournament.jsx";

const initialValue = undefined

const tournamentReducer = (state, action) => {
    switch(action.type) {
        case 'fetchTournaments':
            return action.data
        case 'addTournament':
            return [...state, action.data];
        case 'updateTournament':
            return state.map(tournament => {
                if (tournament.id !== action.data.id) return tournament;
                else return action.data;
            });
        case 'updateStateGame':
            return state.map((tournament) => {
                if (tournament.id !== action.tournamentId) return tournament;
                return {
                    ...tournament,
                    games: tournament.games.map((game) => {
                        if (game.id !== action.gameId) return game;
                        return {
                            ...game,
                            state: action.state
                        };
                    })
                };
            });
    }
}

export const TournamentsContext = createContext([]);

function TournamentsInEventProvider({children, eventId}) {

    const [tournaments, dispatch] = useReducer(tournamentReducer, initialValue, undefined);

    return (
        <TournamentsContext.Provider value={{ tournaments, dispatch }}>
            {children}
        </TournamentsContext.Provider>
    );
}

export default TournamentsInEventProvider;


