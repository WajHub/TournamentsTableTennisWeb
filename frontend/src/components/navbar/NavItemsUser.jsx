import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../providers/AuthProvider.jsx";

function NavItemsUser({navigationItems}) {

    const {user, handleSignOut } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="">
            <Link
                className={"btn btn-outline-dark my-2 my-sm-0 mx-2" + (navigationItems[2].current ? " active" : "")}
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
    );
}

export default NavItemsUser;