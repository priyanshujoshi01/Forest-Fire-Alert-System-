import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';

function App() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch('/alerts')
      .then(response => response.json())
      .then(data => setAlerts(data));
  }, []);

  return (
    <div className="App">
      <h1>Forest Fire Alert System</h1>
      <MapComponent alerts={alerts} />
    </div>
  );
}

export default App;
