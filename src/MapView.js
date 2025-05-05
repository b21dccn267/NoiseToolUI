import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Helper to add emoji/color to noise level
const getNoiseLevelEmoji = (level) => {
  if (level >= 85) return '🔴 Very Loud';
  if (level >= 70) return '🟠 Loud';
  if (level >= 55) return '🟡 Moderate';
  return '🟢 Quiet';
};

const MapView = ({ data }) => {
  return (
    <div
      style={{
        backgroundImage: 'url("/images/mapbac.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '40px',
        color: 'white',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: '28px',
          marginBottom: '20px',
          textShadow: '1px 1px 2px black',
        }}
      >
        🗺️ Map View of Noise Level Data
      </h2>

      <div
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '12px',
          overflow: 'hidden',
          padding: '10px',
        }}
      >
        <MapContainer
          center={[20.0, 0.0]}
          zoom={2}
          style={{
            height: '500px',
            width: '100%',
            borderRadius: '12px',
          }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data.map((row) => (
            <Marker
              key={row.id}
              position={[row.latitude, row.longitude]}
              icon={customIcon}
            >
              <Popup>
                <div>
                  <strong>Noise Level:</strong> {row.noiseLevel} dB <br />
                  <strong>Status:</strong> {getNoiseLevelEmoji(row.noiseLevel)} <br />
                  <strong>Location:</strong> {row.latitude}, {row.longitude} <br />
                  <strong>Timestamp:</strong> {row.timestamp} <br />
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;

