import React from "react";
import { useAuth, isAuth, isMod } from "../../../providers/AuthProvider.jsx";
import{motion} from "framer-motion";

function AddEventCard({ handleClick }) {
  const { user } = useAuth();
  return (
    <>
      {isAuth(user) && isMod(user) ? (
        <motion.div className="col-4" initial={{scale: 0, x:-10}} animate={{scale:1, x:0}}>
          <div className="btn card event-card my-4  h-75" onClick={handleClick}>
            <div className="card-body d-flex justify-content-center align-items-center">
              <h1 className="text-success ">
                <i className="bi bi-plus-circle"></i>
              </h1>
            </div>
          </div>
        </motion.div>
      ) : (
        ""
      )}
    </>
  );
}

export default AddEventCard;
