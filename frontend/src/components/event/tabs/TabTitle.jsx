import React from "react";

function TabTitle({ id, title, active, handleClick }) {
  var title_ = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <li className="nav-item" role="presentation">
      <button
        className={`nav-link ${active ? "active" : ""}`}
        id={`${id}-tab`}
        idtournament={id}
        data-bs-toggle="tab"
        data-bs-target={`#${id}`}
        type="button"
        role="tab"
        aria-controls={id}
        aria-selected="true"
        onClick={handleClick}
      >
        {title_}
      </button>
    </li>
  );
}

export default TabTitle;
