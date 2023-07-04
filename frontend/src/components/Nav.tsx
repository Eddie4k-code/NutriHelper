import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Nav = () => {

    const {user} = useAuthContext();


    return (
        <nav className="navbar">


            <div className="navbar-brand">
                NutriHelper
            </div>

            <ul className="nav-list">
                <li className="nav-item">Search</li>
                <li className="nav-item">Login</li>
                <li className="nav-item">Register</li>

            </ul>

        
        </nav>
    );
}


export default Nav;