import React from 'react';

const AboutPage = () => {
  const projectVersion = process.env.REACT_APP_VERSION || 'N/A';

  return (
    <div style={{ padding: '20px', color: 'var(--navbar-text)', textAlign: 'center' }}>
      <h2>About This Project</h2>
      <p>Version: {projectVersion}</p>
      <p>This application tracks and displays noise level data.</p>
    </div>
  );
};

export default AboutPage;