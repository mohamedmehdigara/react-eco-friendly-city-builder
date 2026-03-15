import React, { useState, useEffect } from 'react';

// --- Integrated Styling Helper ---
const styles = {
  global: {
    margin: 0,
    padding: 0,
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: '#f4fbf4',
    color: '#2c3e50',
    minHeight: '100vh',
  },
  appContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  nav: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '25px',
    background: '#fff',
    padding: '12px',
    borderRadius: '16px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  },
  navButton: (active) => ({
    backgroundColor: active ? '#2e7d32' : '#f0f0f0',
    color: active ? 'white' : '#555',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '0.85em',
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
    boxShadow: active ? '0 4px 10px rgba(46, 125, 50, 0.3)' : 'none',
  }),
  viewContainer: {
    background: 'white',
    padding: '25px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
    minHeight: '500px',
  },
  cityGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '15px',
    marginTop: '20px',
  },
  buildingCard: (type) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 10px',
    border: '2px solid #edf2ed',
    borderRadius: '16px',
    background: type ? '#fff' : '#fafafa',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  }),
  buildingIcon: {
    fontSize: '2.8rem',
    marginBottom: '12px',
  },
  badge: (color) => ({
    fontSize: '0.7em',
    padding: '3px 8px',
    borderRadius: '20px',
    backgroundColor: color || '#e0e0e0',
    color: 'white',
    marginTop: '5px',
  }),
  panel: (bgColor, borderColor) => ({
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '20px',
    border: `1px solid ${borderColor || '#ddd'}`,
    backgroundColor: bgColor || '#fff',
  }),
  resourceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '15px',
    margin: '20px 0',
  },
  statCard: {
    padding: '15px',
    borderRadius: '12px',
    textAlign: 'center',
    background: '#fff',
    border: '1px solid #eee',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(4px)',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    background: 'white',
    padding: '30px',
    borderRadius: '24px',
    width: '90%',
    maxWidth: '450px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
  }
};

// --- Constants & Config ---
const BUILDING_TYPES = [
  { id: 'solar', name: 'Solar Farm', icon: '☀️', cost: 1200, energy: 25, pollution: -2, housing: 0 },
  { id: 'wind', name: 'Wind Turbine', icon: '🌬️', cost: 800, energy: 15, pollution: -1, housing: 0 },
  { id: 'housing', name: 'Eco-Hab', icon: '🏢', cost: 1500, energy: -10, pollution: 1, housing: 50 },
  { id: 'park', name: 'City Park', icon: '🌳', cost: 500, energy: -2, pollution: -5, housing: 0 },
];

// --- Sub-Components ---

const EcoScore = ({ resources, buildings }) => {
  const renewableRatio = Math.min(100, (buildings.filter(b => b?.type === 'energy').length * 20));
  const pollutionImpact = 100 - resources.pollution;
  const score = Math.round((renewableRatio + pollutionImpact + resources.happiness) / 3);

  return (
    <div style={styles.panel('#f1f8e9', '#c5e1a5')}>
      <h3 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>City Eco Score: {score}/100</h3>
      <div style={{ height: '10px', width: '100%', background: '#e0e0e0', borderRadius: '5px' }}>
        <div style={{ 
          height: '100%', 
          width: `${score}%`, 
          background: score > 70 ? '#4caf50' : score > 40 ? '#ffb300' : '#f44336', 
          borderRadius: '5px',
          transition: 'width 1s ease' 
        }} />
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentView, setCurrentView] = useState('city');
  const [resources, setResources] = useState({
    money: 2500,
    energy: 50,
    pollution: 10,
    population: 100,
    happiness: 85
  });

  const [buildings, setBuildings] = useState(Array(12).fill(null));
  const [showBuildMenu, setShowBuildMenu] = useState(null); // stores index of lot
  const [selectedDetail, setSelectedDetail] = useState(null);

  // Simulation Loop
  useEffect(() => {
    const timer = setInterval(() => {
      setResources(prev => {
        const energyProduction = buildings.reduce((acc, b) => acc + (b?.energy || 0), 0);
        const pollutionChange = buildings.reduce((acc, b) => acc + (b?.pollution || 0), 0);
        const housingTotal = buildings.reduce((acc, b) => acc + (b?.housing || 0), 0);

        // Tax revenue based on population
        const income = Math.floor(prev.population * 0.5);
        
        return {
          ...prev,
          money: prev.money + income,
          energy: Math.max(0, 50 + energyProduction),
          pollution: Math.min(100, Math.max(0, prev.pollution + pollutionChange)),
          population: Math.max(100, housingTotal + 100), // Base pop + housing
          happiness: Math.max(0, Math.min(100, 85 - prev.pollution + (energyProduction > 0 ? 5 : -10)))
        };
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [buildings]);

  const handleBuild = (typeObj) => {
    if (resources.money >= typeObj.cost) {
      const newBuildings = [...buildings];
      newBuildings[showBuildMenu] = { ...typeObj, id: Date.now() };
      setBuildings(newBuildings);
      setResources(prev => ({ ...prev, money: prev.money - typeObj.cost }));
      setShowBuildMenu(null);
    } else {
      alert("Not enough money!");
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'city':
        return (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>City District Alpha</h2>
              <div style={{ color: '#666', fontSize: '0.9em' }}>Population: {resources.population}</div>
            </div>
            <div style={styles.cityGrid}>
              {buildings.map((b, i) => (
                <div 
                  key={i} 
                  style={styles.buildingCard(!!b)} 
                  onClick={() => !b ? setShowBuildMenu(i) : setSelectedDetail(b)}
                >
                  <div style={styles.buildingIcon}>{b ? b.icon : '➕'}</div>
                  <strong style={{ fontSize: '0.85em' }}>{b ? b.name : 'Empty Lot'}</strong>
                  {b ? (
                    <div style={styles.badge(b.energy >= 0 ? '#4caf50' : '#f44336')}>
                      {b.energy >= 0 ? `+${b.energy}⚡` : `${b.energy}⚡`}
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.7em', color: '#999' }}>Click to build</span>
                  )}
                </div>
              ))}
            </div>
          </>
        );
      case 'resources':
        return (
          <>
            <h2>Resource Dashboard</h2>
            <div style={styles.resourceGrid}>
              <div style={styles.statCard}>
                <div style={{ fontSize: '1.5rem' }}>💰</div>
                <strong>${resources.money}</strong>
                <div style={{ fontSize: '0.7em' }}>Treasury</div>
              </div>
              <div style={styles.statCard}>
                <div style={{ fontSize: '1.5rem' }}>⚡</div>
                <strong>{resources.energy} MW</strong>
                <div style={{ fontSize: '0.7em' }}>Grid Power</div>
              </div>
              <div style={styles.statCard}>
                <div style={{ fontSize: '1.5rem' }}>☁️</div>
                <strong>{resources.pollution}%</strong>
                <div style={{ fontSize: '0.7em' }}>Pollution</div>
              </div>
              <div style={styles.statCard}>
                <div style={{ fontSize: '1.5rem' }}>😊</div>
                <strong>{resources.happiness}%</strong>
                <div style={{ fontSize: '0.7em' }}>Happiness</div>
              </div>
            </div>
            <EcoScore resources={resources} buildings={buildings} />
          </>
        );
      case 'tech':
        return (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '3rem' }}>🔬</div>
            <h3>Research Lab</h3>
            <p style={{ color: '#666' }}>Unlock carbon capture and nuclear fusion in future updates!</p>
            <button style={styles.navButton(false)}>Coming Soon</button>
          </div>
        );
      case 'achievements':
        return (
          <div style={styles.panel('#fff', '#eee')}>
            <h3>Your Milestones</h3>
            <div style={styles.statRow}>
              <span>Green Pioneer (Built 5 Solar Farms)</span>
              <span>{buildings.filter(b => b?.id === 'solar').length >= 5 ? '🏆' : '🔒'}</span>
            </div>
            <div style={styles.statRow}>
              <span>Clean Skies (Pollution below 5%)</span>
              <span>{resources.pollution < 5 ? '🏆' : '🔒'}</span>
            </div>
          </div>
        );
      default:
        return <div style={{ textAlign: 'center', padding: '50px' }}>Updating system...</div>;
    }
  };

  return (
    <div style={styles.global}>
      <div style={styles.appContainer}>
        <header style={styles.header}>
          <h1 style={{ color: '#2e7d32', marginBottom: '5px' }}>🌱 Eco-City Builder</h1>
          <p style={{ margin: 0, opacity: 0.7 }}>Building a sustainable future, block by block.</p>
        </header>
        
        <nav style={styles.nav}>
          <button style={styles.navButton(currentView === 'city')} onClick={() => setCurrentView('city')}>Map</button>
          <button style={styles.navButton(currentView === 'resources')} onClick={() => setCurrentView('resources')}>Stats</button>
          <button style={styles.navButton(currentView === 'tech')} onClick={() => setCurrentView('tech')}>Science</button>
          <button style={styles.navButton(currentView === 'achievements')} onClick={() => setCurrentView('achievements')}>Medals</button>
          <button style={styles.navButton(currentView === 'settings')} onClick={() => setCurrentView('settings')}>Config</button>
        </nav>

        <div style={styles.viewContainer}>
          {renderView()}
        </div>

        {/* Build Selection Menu */}
        {showBuildMenu !== null && (
          <div style={styles.modalOverlay} onClick={() => setShowBuildMenu(null)}>
            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
              <h3 style={{ marginTop: 0 }}>Select Project</h3>
              <p style={{ fontSize: '0.9em', color: '#666' }}>Budget: ${resources.money}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {BUILDING_TYPES.map(type => (
                  <button 
                    key={type.id}
                    disabled={resources.money < type.cost}
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      padding: '12px',
                      borderRadius: '12px',
                      border: '1px solid #ddd',
                      background: resources.money >= type.cost ? '#fff' : '#f9f9f9',
                      cursor: resources.money >= type.cost ? 'pointer' : 'not-allowed',
                      opacity: resources.money >= type.cost ? 1 : 0.6
                    }}
                    onClick={() => handleBuild(type)}
                  >
                    <span>{type.icon} {type.name}</span>
                    <span style={{ fontWeight: 'bold' }}>${type.cost}</span>
                  </button>
                ))}
              </div>
              <button 
                style={{ ...styles.navButton(false), width: '100%', marginTop: '20px' }} 
                onClick={() => setShowBuildMenu(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Building Details Modal */}
        {selectedDetail && (
          <div style={styles.modalOverlay} onClick={() => setSelectedDetail(null)}>
            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem' }}>{selectedDetail.icon}</div>
                <h2>{selectedDetail.name}</h2>
                <div style={styles.panel('#f9f9f9', '#eee')}>
                  <div style={styles.statRow}><span>Power Output:</span> <strong>{selectedDetail.energy} MW</strong></div>
                  <div style={styles.statRow}><span>Eco Impact:</span> <strong>{selectedDetail.pollution} units</strong></div>
                  {selectedDetail.housing > 0 && (
                    <div style={styles.statRow}><span>Housing Capacity:</span> <strong>{selectedDetail.housing} ppl</strong></div>
                  )}
                </div>
                <button 
                  style={{ ...styles.navButton(true), width: '100%' }} 
                  onClick={() => setSelectedDetail(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}