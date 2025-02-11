import React from "react";

function Message({ content, type }) {
  const alertType = `alert-${type}`;

  return (
      <>
        {content !== "" ? (
            <div className={`m-2 alert ${alertType}`} role="alert">
              {content}
            </div>
        ) : (
            <></>
        )}
      </>
  );
}

export default Message;
