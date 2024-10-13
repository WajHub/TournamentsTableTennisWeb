import React from "react";

function Overlay({ isDisplayed, setDisplay, children }) {
  return (
    <>
      {isDisplayed ? (
        <div className="overlay">
          <div className="container align-middle my-center ">
            <div className="row justify-content-md-center">
              <div className="col-2"></div>
              <div className="col-8 bg-white rounded px-5 py-4">{children}</div>
              <div className="col-2"></div>
            </div>
            <div className="row justify-content-md-center">
              <div
                className="btn btn-danger m-4"
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
