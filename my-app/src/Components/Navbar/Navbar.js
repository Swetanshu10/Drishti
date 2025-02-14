// Navbar.js
import React from 'react';
import './Navbar.css';
import appLogo from '../Assets/app_logo.png';



const Navbar = () => {
  return (
    <div>
    <nav className="navbar">
      <div className="navbar-content">
        <a href="/" className="navbar-brand">
          <img src={appLogo} alt="App Logo" className="navbar-logo" />
        </a>
        <ul className="navbar-links">
          <li>
            <a href="/" className="navbar-link">Home</a>
          </li>
          <li>
            <a href="/signup" className="navbar-link">Sign Up</a>
          </li>
          <li>
            <a href="/location" className="navbar-link">Location</a>
          </li>
          <li>
            <a href="/emergency" className="navbar-link">Emergency</a>
          </li>
        </ul>
      </div>
    </nav>

    <div className="about-us-container"> {/* Container for About Us info */}
        <div className="about-us-content"> {/* Content area for About Us */}
          <h2>About Us</h2>
          <p>
            This is where you will write information about your application or company.
            You can add multiple paragraphs, images, and other content here.  This example
            demonstrates how to position the "About Us" section to the right of the navbar.
          </p>
          {/* Add more content as needed */}
        </div>
      </div>

    </div>
    
  );
};

export default Navbar;