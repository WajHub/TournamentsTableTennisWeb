import React from "react";

function TabContent({ title, active, children }) {
  return (
    <div
      className={`tab-pane fade show ${active ? "active" : ""}`}
      id={`${title}`}
      role="tabpanel"
      aria-labelledby={`${title}-tab`}
    >
      {children}
    </div>
  );
}

export default TabContent;
