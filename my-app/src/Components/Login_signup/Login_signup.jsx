import React, { useState } from 'react';
import './Login_signup.css'; // Component-specific styles


import email from '../Assets/email.png'; // Correct relative path
import hide from '../Assets/hide.png'; // Correct relative path
import user from '../Assets/user.png'; // Correct relative path





export const LoginSignup = () => { // Changed to PascalCase (React convention)
  const [action, setAction] = useState("Sign Up");

  return (
    <div className="login-signup-page">
      <div className="login-signup-content"></div>
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      {/* Input Fields */}
      <div className="inputs">
        {action==="Login"?<div></div>:
        <div className="input">
          <img src={user} alt="User Icon" />
          <input type="text" placeholder="Name" />
        </div>
      }

        <div className="input">
          <img src={email} alt="Email Icon" />
          <input type="email" placeholder="Email Id" />
        </div>

        <div className="input">
          <img src={hide} alt="Password Icon" />
          <input type="password" placeholder="Password" />
        </div>
      </div>

      {/* Forgot Password Section */}
      {action==="Sign Up"?<div></div>:
      <div className="forgot-password">
        Lost Password? <span>Click Here</span>
      </div>
     }

      {/* Submit Buttons */}
      <div className="Submit-container">
        <div
          className={action==="Login"?"submit gray":"submit"}
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </div>
        <div
          className={action==="Sign Up"?"submit gray":"submit"}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>
    </div>
    </div>
    
  );
};
