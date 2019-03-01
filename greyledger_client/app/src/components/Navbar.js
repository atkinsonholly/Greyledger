import React from 'react';
import { Link } from 'react-router-dom';
import "../styling/navbar.css";

const Navbar = (props) => {
    return (
        <nav className="nav-container">
            <div className="nav-logo-container">
              <Link to="/" onClick={props.turnOffSubmitted}>
                <img className="nav-logo" src={require("../images/circle.png")} alt="logo"/>
              </Link>
            </div>
            <div className="nav-li-container">
              <Link to="/"><li className="link" onClick={props.logoutUser}>Log out</li></Link>
              <Link to="/profile"><li className="link" onClick={props.turnOffSubmitted} >Profile</li></Link>
              <Link to="/search"><li className="link">Search</li></Link>
            </div>
        </nav>
    );
}

export default Navbar;
