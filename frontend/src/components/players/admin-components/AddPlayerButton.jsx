import React from "react";
import { useAuth, isAuth, isMod } from "../../../providers/AuthProvider.jsx";
import{motion} from "framer-motion";

function AddPlayerButton({ handleClick }) {
  const { user } = useAuth();
  return (
    <div className="container">
      {isAuth(user) && isMod(user) ? (
        <div
          className="row d-flex justify-content-center align-items-center"
        >
          <div className="col-2">
            <motion.div className=" card event-card my-4 h-75 d-flex justify-content-center align-items-center"
                        initial={{scale: 0, x:-10}} animate={{scale:1, x:0}}
                        onClick={(e) => handleClick(true)}
                        whileHover={
                          { scale: 1.15, x: 10, y:-10,  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            transition: { duration: 0.2 }
                          }
                        }>
              <h1 className="text-success">
                {" "}
                <i className="bi bi-plus-circle"></i>
              </h1>
            </motion.div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AddPlayerButton;
