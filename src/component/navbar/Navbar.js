import React from "react";
import "./Navbar.css"; 

function Navbar() {
  return (
    <>
        <nav className="navbar">
            <div className="logo">
              <img src="logo2.png" alt="Logo" className="logo-img" title="WebPulse" />
            </div>
    
            <ul className="nav-links">
                <li><a href="#">Dashboard</a></li>
                <li><a href="#">Website</a></li>
                <li><a href="#"><i className="fas fa-user-circle profile-icon"></i></a></li>
            </ul>
        </nav>
    </> 
  );
}

export default Navbar;
