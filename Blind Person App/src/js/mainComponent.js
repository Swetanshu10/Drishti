import * as bootstrap from 'bootstrap'
import { useEffect, useRef, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, onSnapshot, setDoc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBqel6Wl-Ig_7L4eTMfebMCRlzkowBQ9fU",
    authDomain: "finalyear-14b62.firebaseapp.com",
    databaseURL: "https://finalyear-14b62-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "finalyear-14b62",
    storageBucket: "finalyear-14b62.firebasestorage.app",
    messagingSenderId: "548992273872",
    appId: "1:548992273872:web:d1c52c05d93598535d3dd5",
    measurementId: "G-PJK9HNF5XV"
}

const app = initializeApp(firebaseConfig)
const firestoredb = getFirestore(app)

export function LocationComponent(){
    const refVariable=useRef()
    return(
        <>
            <div className="animationComponent" ref={refVariable}></div>
            <LocStatus
            ele={refVariable} />
        </>
    )
}

function LocStatus({ele}){
    const [locState,changeState]=useState("Location sharing is off")
    var intervalId

    useEffect(()=>{
        const unsub = onSnapshot(doc(firestoredb, "locationCollection", "locStatus"), (doc) => {
            const locData=doc.data()

            if(locData["status"]===true){
                intervalId=setInterval(()=>{ 
                    navigator.geolocation.getCurrentPosition(success, error)
                },10000)
                ele.current.classList.add("animation")
                changeState("Location sharing is on")
            }
            else if(locData["status"]===false){
                ele.current.classList.remove("animation")
                clearInterval(intervalId)
                changeState("Location sharing is off")
            }
        })

        return ()=>unsub()
    },[])

    return(
        <p>{locState}</p>
    )
}

function error() {
    alert("Sorry, no position available.");
}

async function success(position) {
    await setDoc(doc(firestoredb, "locationCollection", "locCoordinates"), {
        lat: position.coords.latitude,
        long: position.coords.longitude,
        date:new Date()
    })
}