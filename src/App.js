// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, NavLink, useLocation } from 'react-router-dom';
import MapView from './MapView';
import DataView from './DataView';
import AboutPage from './AboutPage'; // Import AboutPage
import 'leaflet/dist/leaflet.css';
import './App.css'; // We'll heavily modify this

// Helper for active link styling (optional, but good practice)
const getNavLinkClass = ({ isActive }) => {
  return isActive ? "nav-link active" : "nav-link";
};

const AppWrapper = () => {
  const location = useLocation();
  // No need for isDataOrMap specific background here, as the top bar is global
  // and individual views manage their own backgrounds.

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
    <div className="app-container"> {/* Main container */}
      <header className="top-bar">
        <div className="top-bar-left-content">
          <div className="top-bar-title">asdf1234</div>
          <nav className="top-bar-nav">
            <NavLink to="/map" className={getNavLinkClass}>MapView</NavLink>
            <NavLink to="/data" className={getNavLinkClass}>DataView</NavLink>
            <NavLink to="/about" className={getNavLinkClass}>About</NavLink>
          </nav>
        </div>
      </header>

      <main className="content-area">
        <Routes>
          <Route path="/data" element={<DataView data={data} />} />
          <Route path="/map" element={<MapView data={data} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/" element={
            <div style={{ textAlign: 'center', color: 'white', paddingTop: '50px' }}>
              <h2>Welcome!</h2>
              <p>Select a view from the navigation bar.</p>
            </div>
          } />
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