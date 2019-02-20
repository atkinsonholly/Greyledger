import React from 'react';
import { Link } from 'react-router-dom';

// NavBar
const Navbar = () => {
    return (
        <nav className="nav-container">
            <div className="nav-logo-container">
                <img className="nav-logo" src="./images/GREYLEDGER.png" alt="logo"/>
            </div>
            <div className="nav-li-container">
                <Link to="/"><li className="link">Log Out</li></Link>
                <Link to="/profile"><li className="link">Profile</li></Link>
                <Link to="/"><li className="link">Home</li></Link>
            </div>
        </nav>
    );
}


export default Navbar;
