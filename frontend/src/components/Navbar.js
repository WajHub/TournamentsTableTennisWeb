import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Home
      </Link>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active"></li>
          <li className="nav-item"></li>
          <li className="nav-item dropdown">
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
            ></div>
          </li>
          <li className="nav-item"></li>
        </ul>
        <button
          className="btn btn-outline-dark my-2 my-sm-0 mx-2"
          type="submit"
        >
          Sing up
        </button>
        <button
          className="btn btn-outline-dark my-2 my-sm-0 mx-2"
          type="submit"
        >
          Sign in
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
