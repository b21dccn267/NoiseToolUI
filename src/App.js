import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, useLocation } from 'react-router-dom';
import MapView from './MapView';
import DataView from './DataView';
import AboutPage from './AboutPage'; // Assuming you have this from Plan A
import 'leaflet/dist/leaflet.css';
import './App.css';

const getNavLinkClass = ({ isActive }) => {
  return isActive ? "nav-link active" : "nav-link";
};

const AppWrapper = () => {
  const [data, setData] = useState([]);
  // Theme state
  const [theme, setTheme] = useState(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      return localTheme;
    }
    // If no preference, check OS preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    // Fetch data (existing logic)
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

  // Effect for theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme); // Set attribute on <html>
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-container">
      <header className="top-bar">
        <div className="top-bar-left-content">
          <div className="top-bar-title">asdf1234</div>
          <nav className="top-bar-nav">
            <NavLink to="/map" className={getNavLinkClass}>MapView</NavLink>
            <NavLink to="/data" className={getNavLinkClass}>DataView</NavLink>
            <NavLink to="/about" className={getNavLinkClass}>About</NavLink>
          </nav>
        </div>
        <div className="top-bar-right-content"> {/* Wrapper for right-aligned items */}
          <button onClick={toggleTheme} className="theme-toggle-button">
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Mode
          </button>
        </div>
      </header>

      <main className="content-area">
        <Routes>
          <Route path="/data" element={<DataView data={data} />} />
          <Route path="/map" element={<MapView data={data} />} />
          <Route path="/about" element={<AboutPage />} /> {/* Ensure AboutPage exists */}
          <Route path="/" element={
            <div style={{ textAlign: 'center', paddingTop: '50px' }}> {/* Text color will be inherited */}
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