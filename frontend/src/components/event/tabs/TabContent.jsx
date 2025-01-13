import React from "react";

function TabContent({ id, active, children }) {
  return (
    <div
      className={`tab-pane fade  ${active ? " show active " : ""}`}
      id={`${id}`}
      role="tabpanel"
      aria-labelledby={`${id}-tab`}
    >
      {children}
    </div>
  );
}

export default TabContent;
