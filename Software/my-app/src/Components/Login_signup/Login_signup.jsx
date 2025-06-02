import React, { useRef, useState } from 'react';
import './Login_signup.css'; // Component-specific styles
import email from '../Assets/email.png'; // Correct relative path
import hide from '../Assets/hide.png'; // Correct relative path
import { initializeApp } from "firebase/app";
import {
  getAuth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification
} from "firebase/auth";
import { useNavigate } from "react-router";

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

function signUpFunction(emailRef, passwordRef) {
  createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
    .then((userCredential) => {

      sendEmailVerification(auth.currentUser)
        .then(() => {
          alert("Account Created, check email for verification mail, After verifying, please login")
        })
    })
    .catch((error) => {
      alert(error.message)
    })
}

function loginFunction(emailRef, passwordRef, navigate) {
  signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
    .then((userCredential) => {
      if (userCredential.user.emailVerified === true) {
        navigate("/Home")
      }
      else {
        alert("Email not verified, First verify your email, then login")
      }
    })
    .catch((error) => {
      alert(error.message)
    })
}

function passwordChangeFunc(emailRef) {
  sendPasswordResetEmail(auth, emailRef.current.value)
    .then(() => {
      alert("Password reset email sent, check your mail")
    })
    .catch((error) => {
      alert(error.message)
    })
}


export const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const emailRef = useRef()
  const passwordRef = useRef()
  let navigate = useNavigate()

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

          <div className="input">
            <img src={email} alt="Email Icon" />
            <input type="email" placeholder="Email Id" ref={emailRef} />
          </div>

          <div className="input">
            <img src={hide} alt="Password Icon" />
            <input type="password" placeholder="Password (min 6 characters)" ref={passwordRef} />
          </div>
        </div>

        {/* Forgot Password Section */}
        {action === "Sign Up" ? <div></div> :
          <div className="forgot-password"
            onClick={() => { passwordChangeFunc(emailRef) }}>
            Lost Password? <span>Click Here</span>
          </div>
        }

        <div className="proceed-container">
          <button
            className="proceed"
            onClick={
              () => {
                if (action === "Sign Up") {
                  signUpFunction(emailRef, passwordRef)
                }
                else if (action === "Login") {
                  loginFunction(emailRef, passwordRef, navigate)
                }
              }
            }
          >
            Proceed
          </button>
        </div>

        {/* Submit Buttons */}
        <div className="Submit-container">
          <button
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={() => setAction("Sign Up")}
          >
            Sign Up
          </button>
          <button
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={() => setAction("Login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>

  );
};
