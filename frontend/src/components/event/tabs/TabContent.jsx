import React from "react";

function TabContent({ id, active, children }) {
  return (
    <div
      className={`tab-pane fade show ${active ? "active" : ""}`}
      id={`${id}`}
      role="tabpanel"
      aria-labelledby={`${id}-tab`}
    >
      {children}
    </div>
  );
}

export default TabContent;
