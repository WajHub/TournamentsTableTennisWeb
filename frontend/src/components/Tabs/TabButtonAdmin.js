import React from "react";

function TabButtonAdmin({ handleClick }) {
  return (
    <li className="nav-item">
      <button className="nav-link" type="button" onClick={handleClick}>
        <i className="h4 text-success bi bi-plus-circle"></i>
      </button>
    </li>
  );
}

export default TabButtonAdmin;
