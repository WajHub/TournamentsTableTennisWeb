import React, { Children } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import TabTitle from "./TabTitle.jsx";
import TabContent from "./TabContent.jsx";
import TabButtonAdmin from "./TabButtonAdmin.jsx";

function NavTabs({ children }) {
  let tabTitles = [];
  let tabContents = [];

  Children.forEach(children, (child) => {
    if (child.type === TabTitle || child.type === TabButtonAdmin) {
      tabTitles.push(child);
    } else if (child.type === TabContent) {
      tabContents.push(child);
    }
  });
  return (
    <div>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        {tabTitles}
      </ul>
      <div className="tab-content" id="myTabContent">
        {tabContents}
      </div>
    </div>
  );
}

export default NavTabs;
