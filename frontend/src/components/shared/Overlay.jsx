import React from "react";
import {AnimatePresence, motion} from "framer-motion";
import {createPortal} from "react-dom";

function Overlay({ isDisplayed, setDisplay, children }) {
  return (
      <>
        {createPortal(
            <AnimatePresence>
              {isDisplayed && (
                  <motion.div className="overlay" exit={{opacity: 0 ,transition: {duration: 0.09} }}>
                    <motion.div
                        className="container align-middle my-center "
                        initial={{scale: 0, x: -10} }
                        animate={{scale: 1, x: 0}}
                        transition={{duration: 0.09}}
                        exit={{scale: 0 ,transition: {duration: 0.09} }}
                    >
                      <div className="d-flex justify-content-center bg-white  bg-white rounded px-5 py-4">
                        {children}
                      </div>
                      <div className="d-flex justify-content-center">
                        <div
                            className="btn btn-danger m-4"
                            onClick={(e) => setDisplay(false)}
                        >
                          Cancel
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
              )}
            </AnimatePresence>,
            document.getElementById("root")
        )
        }

      </>
  );
}

export default Overlay;
