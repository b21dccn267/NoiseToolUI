import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import MapView from './MapView';
import DataView from './DataView';
import 'leaflet/dist/leaflet.css';
import './App.css';

const AppWrapper = () => {
  const location = useLocation();
  const isDataOrMap = location.pathname === '/data' || location.pathname === '/map';

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/noise/list');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={`app-container ${isDataOrMap ? 'gradient-background' : ''}`}>
      <header className="app-header">
        <h1>🌍 Noise Level Tracker</h1>
        <nav className="navbar">
          <Link to="/data" className="nav-link">📋 Data View</Link>
          <Link to="/map" className="nav-link">🗺️ Map View</Link>
        </nav>
      </header>

      <main className="content">
        <Routes>
          <Route path="/data" element={<DataView data={data} />} />
          <Route path="/map" element={<MapView data={data} />} />
          <Route path="/" element={<h2 className="welcome-text">Welcome to the Noise Level Tracker</h2>} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;

