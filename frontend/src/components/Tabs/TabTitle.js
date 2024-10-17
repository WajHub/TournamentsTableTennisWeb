import React from "react";

function TabTitle({ title, active }) {
  var title_ = title.charAt(0).toUpperCase() + title.slice(1);
  return (
    <li className="nav-item" role="presentation">
      <button
        className={`nav-link ${active ? "active" : ""}`}
        id={`${title}-tab`}
        data-bs-toggle="tab"
        data-bs-target={`#${title}`}
        type="button"
        role="tab"
        aria-controls={title}
        aria-selected="true"
      >
        {title_}
      </button>
    </li>
  );
}

export default TabTitle;
