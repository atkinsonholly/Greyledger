import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <nav className="nav-container">
            <div className="nav-logo-container">
              <img className="nav-logo" src="./images/GREYLEDGER.png" alt="logo"/>
            </div>
            <div className="nav-li-container">
              <Link to="/"><li className="link" onClick={props.logoutUser}>Log Out</li></Link>
              <Link to="/profile"><li className="link" onClick={props.turnOffSubmitted} >Profile</li></Link>
              <Link to="/"><li className="link" onClick={props.turnOffSubmitted}>Home</li></Link>
            </div>
        </nav>
    );
}


export default Navbar;
