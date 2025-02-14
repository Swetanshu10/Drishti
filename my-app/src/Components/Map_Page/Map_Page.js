import React from 'react';
import "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
import "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"

export function MapComponent(){
    var map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    

    return(
        <>
            <div id="map"></div>
        </>
    )
}
