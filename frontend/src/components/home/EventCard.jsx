import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider.jsx";
import {motion} from "framer-motion";


function EventCard({ event }) {

  const { user } = useAuth();

  const handleDeleteEvent = () => {
    console.log("ID", event.id);
  };

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
      whileTap={
        { scale: 6,  opacity: 0,
          transition: { duration: 0.09 }
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

        {/*TODO: add functionality and refactor code*/}
        {user ? (
          <div className="container">
            <div className="row ">
              <div className="col text-right">
                {" "}
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("EDIT");
                  }}
                  disabled
                >
                  <i className="bi bi-pencil"></i>
                </button>
              </div>
              <div className="col text-left">
                {" "}
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteEvent(event.id);
                  }}
                  disabled
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

      </div>
    </MotionLink>
  );
}

export default EventCard;
