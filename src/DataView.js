import React from 'react';
import './DataView.css'; // Import the styles

const DataView = ({ data }) => {
  return (
    <div
      style={{
        backgroundImage: 'url("/images/databac.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '40px',
        color: '#fff',
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
        📋 Noise Level Data
      </h2>

      <div
        style={{
          overflowX: 'auto',
          background: 'rgba(0, 0, 0, 0.6)',
          padding: '20px',
          borderRadius: '12px',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            color: '#fff',
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Noise Level (dB)</th>
              <th style={thStyle}>Latitude</th>
              <th style={thStyle}>Longitude</th>
              <th style={thStyle}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} style={row.id % 2 === 0 ? evenRowStyle : {}}>
                <td style={tdStyle}>{row.id}</td>
                <td style={tdStyle}>{row.noiseLevel}</td>
                {/* <td style={tdStyle}>
                  ({row.location.lat}, {row.location.lng})
                </td> */}
                <td style={tdStyle}>{row.latitude}</td>
                <td style={tdStyle}>{row.longitude}</td>
                <td style={tdStyle}>{row.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
const thStyle = {
  border: '1px solid #ddd',
  padding: '12px 16px',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  fontWeight: 'bold',
  textShadow: '1px 1px 1px #000',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '12px 16px',
  textAlign: 'center',
};

const evenRowStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
};
export default DataView;

