import React from 'react';
import {Link} from "react-router-dom";

function NavItemsAuth({navigationItems}) {
    return (
        <div className="">
            <Link
                className={"btn btn-outline-dark my-2 my-sm-0 mx-2" + (navigationItems[4].current ? " active" : "")}
                type="submit"
                to="/signUp"
                onClick={(e) => e.target.blur()}
            >
                Sing up
            </Link>
            <Link
                className={"btn btn-outline-dark my-2 my-sm-0 mx-2 justify-content-end" + (navigationItems[3].current ? " active" : "")}
                type="submit"
                to="/signIn"
                onClick={(e) => e.target.blur()}
            >
                Sign in
            </Link>
        </div>
    );
}

export default NavItemsAuth;