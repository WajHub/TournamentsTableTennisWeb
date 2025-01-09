import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();

  const { user, handleSignOut } = useAuth();
  const location = useLocation();
  const [navigation, setNavigation] = useState([
      {name:"Home",     isHome:true ,   href: "/",          current: false},
      {name:"Players",  isHome:false,   href: "/players",   current: false},
      {name:"About",    isHome:false,   href: "/about",     current: false},
      {name:"Sign In",  isHome:false,   href: "/signIn",    current: false},
      {name:"Sign Up",  isHome:false,   href: "/signUp",    current: false},
  ])

  const handleSwitchPage = (pageName) =>{
    const newNav = navigation.map((nav) =>{
        if(nav.href === pageName) return {...nav, current: true};
        return {...nav, current: false};
    })
      setNavigation(newNav);
  }

    useEffect(() => {
        handleSwitchPage(location.pathname);
    }, [useLocation().pathname]);

  return (
      <nav className=" navbar-light bg-light p-2c d-flex flex-wrap justify-content-between p-2 position-sticky sticky-top">
          <div className="align-content-center">
              {navigation.slice(0,2).map((nav, index) =>{
                  return (
                      <Link className={"item-nav m-0 p-2 rounded"+(nav.current ? " item-current" : "")}
                            to={nav.href}
                            key={index}
                      >
                          {nav.isHome ? (<i className="bi bi-house-door-fill p-1"></i>) : ""}
                          {nav.name}
                      </Link>)
              })}
          </div>
          {user ? (
              <div className="">
                  <Link
                      className={"btn btn-outline-dark my-2 my-sm-0 mx-2"+(navigation[2].current ? " active" : "")}
                      type="submit"
                      to="/about"
                      onClick={(e) => e.target.blur()}
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
                      to={"/"}
                      onClick={(e) => {
                        handleSignOut(user).then(() => navigate("/"));
                      }}>
                      Sign out
                  </Link>
              </div>
          ) : (
              <div className="">
                  <Link
                      className={"btn btn-outline-dark my-2 my-sm-0 mx-2"+(navigation[4].current ? " active" : "")}
                      type="submit"
                      to="/signUp"
                      onClick={(e) => e.target.blur()}
                  >
                      Sing up
                  </Link>
                  <Link
                      className={"btn btn-outline-dark my-2 my-sm-0 mx-2 justify-content-end"+(navigation[3].current ? " active" : "")}
                      type="submit"
                      to="/signIn"
                      onClick={(e) => e.target.blur()}
                  >
                      Sign in
                  </Link>
              </div>
          )}
      </nav>
  );
}

export default Navbar;
