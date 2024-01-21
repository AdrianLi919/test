// MapContainer.js
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import userIcon from './assets/user.png'; // Import the user icon image



const MapContainer = ({ people, selectedPerson, onSelectPerson }) => {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map', {
      center: [22.3193, 114.1694], // HK
      zoom: 13,
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add markers for each person
    people.forEach(person => {
      const icon = L.divIcon({
        html: `<div><img src=${userIcon} class="person-icon" /></div><div>${person.name.first} ${person.name.last}</div>`,
        className: 'custom-div-icon'
      });
    
      const marker = L.marker([person.location.latitude, person.location.longitude], { icon }).addTo(map);
      marker.on('click', () => {
        onSelectPerson(person);
      });
    });

    // If a person is selected, center the map on their location
    if (selectedPerson) {
      map.setView([selectedPerson.location.latitude, selectedPerson.location.longitude], 13);
    }

    // Cleanup the map on component unmount
    return () => {
      map.remove();
    };
  }, [people, selectedPerson, onSelectPerson]);

  return <div id="map" style={{ height: '100vh', width: '100%' }} />;
};

export default MapContainer;
