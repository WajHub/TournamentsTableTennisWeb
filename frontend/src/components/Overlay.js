import React from "react";

function Overlay({ isDisplayed, setDisplay, children }) {
  return (
    <>
      {isDisplayed ? (
        <div className="overlay">
          <div className="container mt-4 bg-white rounded">
            <div className="row">
              <div className="col mx-center m-1">{children}</div>
            </div>
            <div className="row">
              <div className="col mx-center m-1">
                <div
                  className="btn btn-danger m-1"
                  onClick={(e) => setDisplay(false)}
                >
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Overlay;
