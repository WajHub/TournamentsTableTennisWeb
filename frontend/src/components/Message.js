import React from "react";

function Message({ content, type }) {
  console.log(type);
  const alertType = `alert-${type}`;

  return (
    <div className={`m-2 alert ${alertType}`} role="alert">
      {content}
    </div>
  );
}

export default Message;
