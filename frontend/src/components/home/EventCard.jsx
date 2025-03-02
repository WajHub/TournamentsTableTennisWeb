import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {isMod, useAuth} from "../../providers/AuthProvider.jsx";
import {motion} from "framer-motion";
import {Button} from "@mui/material";
import {subscribe, unsubscribe} from "../../utils/api.js";


function EventCard({ event, handleDelete, handleEdit }) {

  const { user } = useAuth();

  const [isSubscribed, setSubscription] = useState(false);

    useEffect(() => {
        console.log("TESt", user)
        if (user && user.events) {
            console.log(user.events);
            const isEventSubscribed = user.events.some((eventItem) => eventItem.id === event.id);
            setSubscription(isEventSubscribed);
        }
    }, [user, event])

  const onClickInfo = () => {
    if(isSubscribed) {
        unsubscribe(event.id);
        setSubscription(false);
    }
    else {
        subscribe(event.id);
        setSubscription(true)
    }
  }

  const MotionLink = motion.create(Link);



  return (
    <MotionLink
      className="card event-card my-4"
      to={`/eventInfo/${event.id}`}
      whileHover={
        { scale: 1.15, x: 10, y:-10,  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: { duration: 0.2 }
        }
      }
    >
      <div className="card-body">
          {user && (
              <Button
                  size="small"
                  variant={isSubscribed ? "contained" : "outlined"}
                  className="m-1 rounded-pill"
                  onClick={(e) => {
                      e.preventDefault();
                      onClickInfo()
                  }}
              >
                  <i className="bi bi-info-circle"></i>
              </Button>
          )}
        <h5 className="card-title">{event.name}</h5>
        <p className="card-text">
          <small className="text-muted">
            {event.date != null ? event.date : ""}
          </small>
        </p>

        {(user && isMod(user)) && (
            <div className={"d-flex justify-content-around flex-wrap"}>
                <Button
                  size="small"
                  variant="contained"
                  className="mt-1"
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit(event);
                  }}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  size="small"
                  className="mt-1"
                  variant="contained"
                  color="error"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(event.id);
                  }}
                >
                  <i className="bi bi-trash"></i>
                </Button>
            </div>
        )}

      </div>
    </MotionLink>
  );
}

export default EventCard;
