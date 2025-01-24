import React from "react";
import { Link } from "react-router-dom";
import {isMod, useAuth} from "../../providers/AuthProvider.jsx";
import {motion} from "framer-motion";
import {deleteEvent} from "../../utils/api.js";
import {Button} from "@mui/material";


function EventCard({ event, handleDelete, handleEdit }) {

  const { user } = useAuth();

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
