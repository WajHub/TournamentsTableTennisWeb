import React from "react";
import { useAuth, isAuth, isMod } from "../../../providers/AuthProvider.jsx";
import{motion} from "framer-motion";

function AddEventCard({ handleClick }) {
  const { user } = useAuth();
  return (
    <>
      {isAuth(user) && isMod(user) ? (
        <div className="col-4" >
          <motion.div className=" card event-card my-4 h-75" onClick={handleClick}
                      initial={{scale: 0, x:-10}} animate={{scale:1, x:0}}
                      whileHover={
                        { scale: 1.15, x: 10, y:-10,  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                          transition: { duration: 0.2 }
                        }
                      }
          >
            <div className="card-body d-flex justify-content-center align-items-center">
              <h1 className="text-success ">
                <i className="bi bi-plus-circle"></i>
              </h1>
            </div>
          </motion.div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default AddEventCard;
