import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Menu, X } from "lucide-react";
import "mdb-ui-kit/css/mdb.min.css"; // Import MDB styles
import { Collapse, Ripple, initMDB } from "mdb-ui-kit";
import appLogo from "../Assets/app_logo.png"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Initialize MDB components when the component mounts
  useEffect(() => {
    initMDB({ Collapse, Ripple });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container-fluid">
        <img className="navbar-brand" src={appLogo} alt="AppLogo"/>
        
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarTogglerDemo02"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
        
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">Sign In</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">Location</a>
            </li>
          </ul>
          <form className="d-flex input-group w-auto">
            <input
              type="search"
              className="form-control"
              placeholder="Type query"
              aria-label="Search"
            />
            <button className="btn btn-outline-primary" type="button">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
