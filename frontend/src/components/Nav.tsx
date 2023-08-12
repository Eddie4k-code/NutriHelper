import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Nav = () => {

    

    const {user, logout} = useAuthContext();


    return (
        <nav className="navbar">


            <div className="navbar-brand">
                NutriHelper
            </div>

            <ul className="nav-list">
                <li className="nav-item">Search</li>
                {user && <li className="nav-item" onClick={logout}>Logout</li>}
                {!user && <li className="nav-item">Login</li>}
                {!user &&<li className="nav-item">Register</li>}

            </ul>

        
        </nav>
    );
}


export default Nav;