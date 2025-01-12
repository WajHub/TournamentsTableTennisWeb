import React from 'react';
import {Link} from "react-router-dom";

function NavItems({navigationItems}) {
    return (
        <div className="align-content-center">
            {navigationItems.map((nav, index) => {
                return (
                    <Link className={"item-nav m-0 p-2 rounded" + (nav.current ? " item-current" : "")}
                          to={nav.href}
                          key={index}
                          aria-current={nav.current ? "page" : undefined}
                    >
                        {nav.isHome ? (<i className="bi bi-house-door-fill p-1"></i>) : ""}
                        {nav.name}
                    </Link>)
            })}
        </div>
    );
}

export default NavItems;