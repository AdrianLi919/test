import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PeopleList from './PeopleList';
import PersonDetail from './PersonDetail';
import MapContainer from './MapContainer';
import './assets/style.css';

const App = () => {
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [view, setView] = useState('list'); // 'list' or 'map'
  const [error, setError] = useState(false); // Define the error state variable

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.json-generator.com/templates/-xdNcNKYtTFG/data', {
          headers: {
            'Authorization': 'Bearer b2atclr0nk1po45amg305meheqf4xrjt9a1bo410'
          },
          cache: true
        });
        setPeople(response.data);
        setError(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        // Show error message in the UI
        setError(true);
        // Retry the request after a delay
        setTimeout(() => {
          fetchData();
        }, 1000); // Add a 1 second delay before retrying
      }
    };

    fetchData();
  }, []);

  return (
    
    <div className="app">
      <div>
        <button onClick={() => setView('list')}>List View</button>
        <button onClick={() => setView('map')}>Map View</button>
      </div>

      {view === 'list' ? (
        <PeopleList people={people} onSelectPerson={setSelectedPerson} />
      ) : (
        <MapContainer people={people} selectedPerson={selectedPerson} onSelectPerson={setSelectedPerson} />
      )}
      {selectedPerson && <PersonDetail person={selectedPerson} />}
      {error && <div className="error-div">Error fetching data.</div>}
    </div>
  );
};

export default App;
