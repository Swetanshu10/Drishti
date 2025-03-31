import React, { useState, useEffect } from 'react';
import './Chat_Page.css';
import 'mdb-ui-kit/css/mdb.min.css'; // Import MDB styles
import black from '../Assets/black.png'; // Adjust the path accordingly
import appLogo from '../Assets/app_logo.png';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "../Navbar/Navbar.js"
import { useNavigate } from "react-router"

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
const database = getDatabase(app);
const auth = getAuth(app);

function askNotificationPermission() {
  // Check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support notifications.");
    return;
  }
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      alert("permission granted")
    }
    else {
      alert("permission not granted")
    }
  })
}

export function ChatComponent() {
  let navigate = useNavigate()

  useEffect(() => {
    const authUnsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/")
      }
    })

    return () => authUnsub()
  }, [])

  return (
    <>
      <Navbar />
      {/* Outer Div */}
      <div className="outer-div">
        {/* Title for Outer Div */}
        <h1>EMERGENCY MESSAGE</h1>

        {/* Inner Div */}
        <div className="inner-div">
          {/* Chat Messages */}
          <div className="chat-messages">
            <MessageBox />
          </div>
        </div>

        <button
          onClick={() => { askNotificationPermission() }}>Enable Notifications</button>
      </div>
    </>
  );
}

function MessageBox() {
  const [dataArray, changeDataArray] = useState([])

  useEffect(() => {

    const EmergencyRef = ref(database, 'Emergency/')
    let numOfExecutions = 0
    onValue(EmergencyRef, (data) => {
      if (Notification.permission === "granted" && numOfExecutions > 0) {
        const text = "A new emergency message is received on the app"
        const notification = new Notification("Emergency Message Notification", { body: text, icon: { appLogo } });
      }
      if (data.val() !== null) {
        const dataKeys = Object.keys(data.val())
        const container = []
        dataKeys.forEach((element) => {
          container.push({ "Time": element, "Message": data.val()[element]["message"] })
        })
        changeDataArray(container)
      }
      numOfExecutions++
    })

  }, [])

  return (
    <>
      {
        dataArray.map((item, index) => {
          return (
            <div className="d-flex flex-row justify-content-end" key={index}>
              <div>
                <p className="small p-2 me-3 mb-1 custom-text rounded-3 custom-bg">
                  {item.Message}
                </p>
                <p className="small me-3 mb-3 rounded-3 text-muted">{item.Time}</p>
              </div>
              <img
                src={black}
                alt="avatar 1"
                style={{ width: '62px', height: '100%' }}
              />
            </div>
          )
        })
      }
    </>
  )
}