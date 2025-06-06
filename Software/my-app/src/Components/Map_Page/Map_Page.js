import React, {useEffect, useRef} from 'react';
import './Map_Page.css'
import 'mdb-ui-kit/css/mdb.min.css';
import leaflet from "leaflet"
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, onSnapshot, setDoc} from "firebase/firestore";
import {useNavigate} from 'react-router-dom'
import Navbar from "../Navbar/Navbar.js"

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

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const firestoredb = getFirestore(app)

async function startLocationSharing(){
    await setDoc(doc(firestoredb, "locationCollection", "locStatus"), {
        status: true
    })
}

async function stopLocationSharing(){
    await setDoc(doc(firestoredb, "locationCollection", "locStatus"), {
        status: false
    })
}

export function MapComponent(){
    const navigate=useNavigate()

    useEffect(() => {
        const authUnsub=onAuthStateChanged(auth, (user) => {
          if (!user) {
            navigate("/")
          }
        })

        return ()=>authUnsub()
    }, [])

    const mapRef=useRef()
    const infoRef=useRef()

    useEffect(()=>{

        mapRef.current = leaflet.map('map')
        
        leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { 
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(mapRef.current);

        let marker = leaflet.marker([0,0]).addTo(mapRef.current)

        const unsub = onSnapshot(doc(firestoredb, "locationCollection", "locCoordinates"), (doc) => {
            const locationCoordinates=doc.data()
            mapRef.current.setView([locationCoordinates["lat"],locationCoordinates["long"]], 17)
            marker.setLatLng([locationCoordinates.lat, locationCoordinates.long]);
            infoRef.current.innerText=`Last updated: ${locationCoordinates['date'].toDate()}`
        })

        return ()=> unsub() 
    },[])
    
    return(
        <>
            <Navbar/>
            <div className="outer-box">
                <h1>LOCATION TRACKING</h1>

                <div className="inner-box" id="map" ref={mapRef}>
                </div>

                <p ref={infoRef}>Last updated:</p>

                <button
                onClick={ ()=>{startLocationSharing()} }>Start location sharing</button>
                <button
                onClick={ ()=>{stopLocationSharing()} }>Stop location sharing</button>
            </div>
        </>
    )
}
