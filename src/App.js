import React, { useState, useEffect } from 'react';

// --- Integrated Styling Helper ---
// Since external styled-components might have resolution issues in this environment,
// we'll use a standard object-based styling approach with a helper to maintain the "Styled" feel.

const styles = {
  global: {
    margin: 0,
    padding: 0,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f0f4f0',
    color: '#333',
    minHeight: '100vh',
  },
  appContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
  },
  nav: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '30px',
    background: 'white',
    padding: '15px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  navButton: (active) => ({
    backgroundColor: active ? '#2e7d32' : '#4CAF50',
    color: 'white',
    padding: '10px 18px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9em',
    fontWeight: active ? 'bold' : 'normal',
    transition: 'all 0.3s ease',
  }),
  viewContainer: {
    background: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    minHeight: '400px',
  },
  cityGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  buildingCard: (isEmpty) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    background: isEmpty ? '#f9f9f9' : 'white',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  }),
  buildingIcon: {
    fontSize: '2.5rem',
    marginBottom: '10px',
  },
  panel: (bgColor, borderColor) => ({
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    textAlign: 'left',
    border: `1px solid ${borderColor || '#ccc'}`,
    backgroundColor: bgColor || '#fff',
  }),
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
  },
  resourceValue: {
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    zIndex: 1000,
    width: '90%',
    maxWidth: '400px',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  }
};

// --- Components ---

const ResourcePanel = ({ resources }) => (
  <div style={styles.panel('#e8f5e9', '#aed581')}>
    <h3>Quick Overview</h3>
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
      <div>💰 ${resources.money}</div>
      <div>⚡ {resources.energy}MW</div>
      <div>☁️ {resources.pollution}%</div>
    </div>
  </div>
);

const ResourceManager = ({ resources, onDetails }) => (
  <div style={styles.panel('#f1f8e9', '#c5e1a5')}>
    <h2>Detailed Resource Management</h2>
    <div style={styles.statRow}>
      <span>Finances:</span>
      <span style={styles.resourceValue}>${resources.money}</span>
      <button style={styles.navButton(false)} onClick={() => onDetails('Money')}>Details</button>
    </div>
    <div style={styles.statRow}>
      <span>Energy Grid:</span>
      <span style={styles.resourceValue}>{resources.energy} MW</span>
      <button style={styles.navButton(false)} onClick={() => onDetails('Energy')}>Details</button>
    </div>
    <div style={styles.statRow}>
      <span>Population:</span>
      <span style={styles.resourceValue}>{resources.population}</span>
      <button style={styles.navButton(false)} onClick={() => onDetails('Population')}>Details</button>
    </div>
  </div>
);

// --- Main App Logic ---

export default function App() {
  const [currentView, setCurrentView] = useState('city');
  const [resources, setResources] = useState({
    money: 10000,
    energy: 100,
    pollution: 15,
    population: 500,
    happiness: 80
  });

  const [buildings, setBuildings] = useState([
    { id: 1, name: 'Solar Farm', type: 'energy', icon: '☀️', cost: 2000 },
    { id: 2, name: 'Eco-Apartments', type: 'housing', icon: '🏢', cost: 1500 },
    { id: 3, name: 'City Park', type: 'eco', icon: '🌳', cost: 800 },
    null, null, null // Empty slots
  ]);

  const [selectedDetail, setSelectedDetail] = useState(null);

  // Game Loop simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setResources(prev => ({
        ...prev,
        money: prev.money + 50,
        energy: prev.energy + (buildings.filter(b => b?.type === 'energy').length * 10)
      }));
    }, 5000);
    return () => clearInterval(timer);
  }, [buildings]);

  const build = (index) => {
    if (resources.money >= 1000) {
      const newBuildings = [...buildings];
      newBuildings[index] = { id: Date.now(), name: 'Wind Turbine', type: 'energy', icon: '🌬️', cost: 1000 };
      setBuildings(newBuildings);
      setResources(prev => ({ ...prev, money: prev.money - 1000 }));
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'city':
        return (
          <>
            <h2>Your Eco-City</h2>
            <div style={styles.cityGrid}>
              {buildings.map((b, i) => (
                <div 
                  key={i} 
                  style={styles.buildingCard(!b)} 
                  onClick={() => !b && build(i)}
                >
                  <div style={styles.buildingIcon}>{b ? b.icon : '🏗️'}</div>
                  <strong>{b ? b.name : 'Empty Lot'}</strong>
                  {!b && <small>Click to Build ($1000)</small>}
                </div>
              ))}
            </div>
          </>
        );
      case 'resources':
        return (
          <>
            <ResourcePanel resources={resources} />
            <ResourceManager 
              resources={resources} 
              onDetails={(type) => setSelectedDetail(type)} 
            />
          </>
        );
      case 'pollution':
        return (
          <div style={styles.panel('#fff3e0', '#ffe0b2')}>
            <h2>Pollution Tracker</h2>
            <div style={{ fontSize: '3rem' }}>{resources.pollution >= 50 ? '⚠️' : '✅'}</div>
            <p>Current Levels: {resources.pollution}%</p>
            <progress value={resources.pollution} max="100" style={{ width: '100%' }} />
          </div>
        );
      default:
        return <div>View under construction...</div>;
    }
  };

  return (
    <div style={styles.global}>
      <div style={styles.appContainer}>
        <h1>🌱 Eco-City Builder</h1>
        
        <nav style={styles.nav}>
          <button style={styles.navButton(currentView === 'city')} onClick={() => setCurrentView('city')}>City Map</button>
          <button style={styles.navButton(currentView === 'resources')} onClick={() => setCurrentView('resources')}>Resources</button>
          <button style={styles.navButton(currentView === 'pollution')} onClick={() => setCurrentView('pollution')}>Pollution</button>
          <button style={styles.navButton(currentView === 'tech')} onClick={() => setCurrentView('tech')}>Technology</button>
          <button style={styles.navButton(currentView === 'achievements')} onClick={() => setCurrentView('achievements')}>Achievements</button>
          <button style={styles.navButton(currentView === 'settings')} onClick={() => setCurrentView('settings')}>Settings</button>
        </nav>

        <div style={styles.viewContainer}>
          {renderView()}
        </div>

        {selectedDetail && (
          <>
            <div style={styles.overlay} onClick={() => setSelectedDetail(null)} />
            <div style={styles.modal}>
              <h2>{selectedDetail} Analysis</h2>
              <p>Detailed breakdown of your city's {selectedDetail.toLowerCase()} metrics and projections.</p>
              <button style={styles.navButton(true)} onClick={() => setSelectedDetail(null)}>Close Analysis</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}