import React from "react";

function Overlay({ isDisplayed, setDisplay, children }) {
  return (
    <>
      {isDisplayed ? (
        <div className="overlay">
          <div className="container align-middle my-center rounded">
            <div className="row justify-content-md-center m-2">
              <div className="col-md-auto bg-white ">{children}</div>
            </div>
            <div className="row justify-content-md-center">
              <div
                className="btn btn-danger m-1"
                onClick={(e) => setDisplay(false)}
              >
                Cancel
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
