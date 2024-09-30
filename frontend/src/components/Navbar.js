import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Home
      </Link>
      <div className="ml-auto">
        <Link
          className="btn btn-outline-dark my-2 my-sm-0 mx-2"
          type="submit"
          to="/signUp"
        >
          Sing up
        </Link>
        <Link
          className="btn btn-outline-dark my-2 my-sm-0 mx-2 justify-content-end"
          type="submit"
          to="/signIn"
        >
          Sign in
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
