import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import NavTabs from "./tabs/NavTabs.jsx";
import TabTitle from "./tabs/TabTitle.jsx";
import TabContent from "./tabs/TabContent.jsx";
import TabButtonAdmin from "./tabs/TabButtonAdmin.jsx";
import { useAuth } from "../../providers/AuthProvider.jsx";
import Overlay from "../shared/Overlay.jsx";
import FormTournament from "./FormTournament.jsx";
import { loadEvent, loadTournaments } from "../../utils/api.js";
import Tournament from "./Tournament.jsx";

import {WebsocketContext} from "../../providers/WebsocketProvider.jsx"
import {TournamentsContext} from "../../providers/TournamentsInEventProvider.jsx";
import tournament from "./Tournament.jsx";

function Event() {
  const { user, handleSignOut } = useAuth();
  const { id } = useParams();

  const [displayFormTournament, setDisplayFormTournament] = useState(false);
  const [eventData, setEventData] = useState({
    name: "",
  });

  // TODO: use Reducer with Context to store data
  // const [tournaments, setTournaments] = useState([]);

  const {subscribe, unsubscribe, sendMessage} = useContext(WebsocketContext);
  const {tournaments, dispatch} = useContext(TournamentsContext)

  const fetchData = async () => {
    const event = await loadEvent(id);
    setEventData(event);

      // setTournaments(tournaments);

    const response = await loadTournaments(id);
    dispatch({
        type: "fetchTournaments",
        data: response
    })
  };

  useEffect(() => {
    fetchData().then(r => {});
  }, []);

  useEffect(() =>{
    const channel = `/topic/events/${id}`

    const subscription = subscribe(channel, (response) =>{
      const gameUpdated = JSON.parse(response);
      console.log("Received message: ", gameUpdated);
      dispatch({
          type:"resultGame",
          data: gameUpdated
      })

      // setTournaments((prevTournaments) =>{
      //  return prevTournaments
      //      .map((tournament)=> {
      //       return {
      //         ...tournament,
      //         games: tournament.games.map((game) =>{
      //           if(game.id === gameUpdated.id){
      //             return gameUpdated;
      //           }
      //           return game;
      //         })
      //       }
      //     }
      //   )
      // })


    })

    return () =>  {
      unsubscribe(subscription);
    }
      }
  , [subscribe, unsubscribe]);


  if(tournaments === undefined) return (<div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
  </div>)

    return (
        <div>
            <h3 className="h3">{eventData.name}</h3>
            <NavTabs>
            {/*TITLE TABS */}
            {tournaments.map((tournament, index) => (
              <TabTitle
                key={tournament.id}
                title={tournament.name}
                id={tournament.id}
                active={index===0}
              />
            ))}

            {/*TITLE TAB FOR ADMIN */}
            {user ? (
              <TabButtonAdmin
                className="h1"
                handleClick={(e) => setDisplayFormTournament(true)}
              />
            ) : (
              ""
            )}

            {/*CONTENT TABS */}
            {tournaments.map((tournament, index) => (
              <TabContent key={tournament.id} id={tournament.id} active={index===0}>
                <Tournament tournament={tournament}/>
              </TabContent>
            ))}
          </NavTabs>

          {/*FORM TOURNAMENT */}
          <Overlay
            isDisplayed={displayFormTournament}
            setDisplay={setDisplayFormTournament}
          >
            <FormTournament
              setDisplay={setDisplayFormTournament}
            ></FormTournament>
          </Overlay>
    </div>
  );
}

export default Event;
