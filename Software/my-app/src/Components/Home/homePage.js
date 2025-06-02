import React, {useEffect} from 'react';
import Navbar from '../Navbar/Navbar.js';
import './homePage.css'
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
  const auth = getAuth(app);

const HomeComponent=()=>{
    let navigate = useNavigate()

    useEffect(() => {
        const authUnsub=onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/")
            }
        })

        return () => authUnsub()
    }, [])

    return(
        <>
            <Navbar/>
            <div className="about-us-container"> {/* Container for About Us info */}
                <div className="about-us-content"> {/* Content area for About Us */}
                    <h2>About Us</h2>
                    <p>
                    Drishti <br></br>
                    At Drishti, we believe that everyone deserves to move freely and safely. Our smart navigation system helps visually impaired individuals share their live location with trusted family and friends and send emergency messages in real time, 
                    providing peace of mind and independence. Whether traveling alone or navigating daily life, our system ensures help is always just a step away.
                    Designed with simplicity and reliability in mind, Drishti is easy to use and works seamlessly in the background. Our goal is to enhance confidence and independence for visually impaired individuals, making everyday travel safer. With real-time updates and instant alerts, family members can stay informed and provide support when needed.
                    We are on a mission to make the world more accessible, one step at a time. Join us in creating a future where no one feels lost or alone.
                    <br></br>Drishti - See the world through trust.
                    </p>
                </div>
            </div>
        </>

    )
}

export default HomeComponent
