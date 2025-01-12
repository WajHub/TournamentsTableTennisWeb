import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider.jsx";
import {motion} from "framer-motion";
import { useLocation } from "react-router-dom";
import NavItems from "./NavItems.jsx";
import NavItemsUser from "./NavItemsUser.jsx";
import NavItemsAuth from "./NavItemsAuth.jsx";

function Navbar() {

  const location = useLocation();
  const { user } = useAuth();

  const [navigation, setNavigation] = useState([
      {name:"Home",     isHome:true ,   href: "/",          current: false},
      {name:"Players",  isHome:false,   href: "/players",   current: false},
      {name:"About",    isHome:false,   href: "/about",     current: false},
      {name:"Sign In",  isHome:false,   href: "/signIn",    current: false},
      {name:"Sign Up",  isHome:false,   href: "/signUp",    current: false},
  ])

    useEffect(() => {
        const handleSwitchPage = (pageName) =>{
            const newNav = navigation.map((nav) =>{
                if(nav.href === pageName) return {...nav, current: true};
                return {...nav, current: false};
            })
            setNavigation(newNav);
        }

        handleSwitchPage(location.pathname);
    }, [useLocation().pathname]);

  return (
      <motion.nav className=" navbar-light bg-light p-2c d-flex flex-wrap justify-content-between p-2 position-sticky sticky-top"
        initial={{y: -50}} animate={{y:0}}
      >
          <NavItems navigationItems={navigation.slice(0,2)} />
          {user ? (
             <NavItemsUser navigationItems={navigation}/>
          ) : (
            <NavItemsAuth navigationItems={navigation}/>
          )}
      </motion.nav>
  );
}

export default Navbar;
