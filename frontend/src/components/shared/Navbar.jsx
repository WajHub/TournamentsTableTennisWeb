import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();

  const { user, handleSignOut } = useAuth();

  const [navigation, setNavigation] = useState(window.location.pathname==="/" ? 0 : 1);


  return (
      <nav className=" navbar-light bg-light p-2c d-flex flex-wrap justify-content-between p-2">
          <div className="align-content-center">
          <Link className={"item-nav m-0 p-2 rounded"+(navigation === 0 ? " item-current" : "")} to="/" onClick={() => setNavigation(0)}>
              <i className="bi bi-house-door-fill p-1"></i>
              Home
          </Link>
          <Link className={"item-nav m-0 p-2 rounded" + (navigation === 1 ? " item-current" : "")} to="/players" onClick={() => setNavigation(1)}>
              Players
          </Link>
          </div>
          {user ? (
              <div className="">
                  <Link
                      className="btn btn-outline-dark my-2 my-sm-0 mx-2"
                      type="submit"
                      to="/about"
                  >
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-file-person"
                          viewBox="0 0 16 16"
                      >
                          <path
                              d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                          <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                      </svg>
                  </Link>
                  <Link
                      className="btn btn-outline-danger my-2 my-sm-0 mx-2"
                      type="submit"
                      onClick={(e) => {
                          handleSignOut(user).then(() => navigate("/"));
                      }}
                      to={"/"}>
                      Sign out
                  </Link>
              </div>
          ) : (
              <div className="">
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
          )}
      </nav>
  );
}

export default Navbar;
