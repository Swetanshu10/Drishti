
import React from 'react';
import './Navbar.css';
import appLogo from '../Assets/app_logo.png';
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router';

const firebaseConfig = {
  apiKey: "AIzaSyBqel6Wl-Ig_7L4eTMfebMCRlzkowBQ9fU",
  authDomain: "finalyear-14b62.firebaseapp.com",
  databaseURL: "https://finalyear-14b62-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "finalyear-14b62",
  storageBucket: "finalyear-14b62.firebasestorage.app",
  messagingSenderId: "548992273872",
  appId: "1:548992273872:web:4a4d8bbf28fbe5285d3dd5",
  measurementId: "G-8BR1DC4ZNJ"
}
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const Navbar = () => {
  let navigate=useNavigate()

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img src={appLogo} alt="App Logo" className="navbar-logo" />
        <ul className="navbar-links">
          <li>
            <a href="/Home" className="navbar-link">Home</a>
          </li>
          <li>
            <a href="/" className="navbar-link">Sign Up</a>
          </li>
          <li>
            <a href="/Location" className="navbar-link">Location</a> 
          </li>
          <li>
            <a href="/Emergency" className="navbar-link">Emergency</a>
          </li>
          <li>
            <button className="logOut"
            onClick={()=>{
              signOut(auth).then(() => {
                navigate("/")
              }).catch((error) => {
                alert(error.message)
              });
            }}>Log out</button>
          </li>
        </ul> 
      </div>
    </nav>
    
  );
};

export default Navbar;