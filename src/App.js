import React, { useState, useEffect, useMemo, useRef } from 'react';

// --- Integrated Styling Helper ---
const styles = {
  global: {
    margin: 0,
    padding: 0,
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: '#f4fbf4',
    color: '#2c3e50',
    minHeight: '100vh',
    transition: 'background-color 2s ease, filter 0.5s ease',
  },
  appContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  nav: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '20px',
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
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '25px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
    minHeight: '520px',
    backdropFilter: 'blur(10px)',
    position: 'relative',
  },
  cityGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '15px',
    marginTop: '20px',
  },
  buildingCard: (type, isNight, isEmergency, weather) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 10px',
    border: isEmergency ? '2px solid #e74c3c' : (isNight ? '2px solid #34495e' : '2px solid #edf2ed'),
    borderRadius: '16px',
    background: type ? (isNight ? '#2c3e50' : '#fff') : (isNight ? '#1a252f' : '#fafafa'),
    color: isNight && type ? '#ecf0f1' : 'inherit',
    transition: 'all 0.5s ease',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: type ? '0 4px 6px rgba(0,0,0,0.05)' : 'none',
    animation: isEmergency ? 'pulse 1.5s infinite' : 'none',
    filter: weather === 'Storm' ? 'brightness(0.8)' : 'none',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '15px',
    margin: '20px 0',
  },
  statCard: (isNight, alert) => ({
    padding: '15px',
    borderRadius: '12px',
    textAlign: 'center',
    background: alert ? '#fee2e2' : (isNight ? '#34495e' : '#fff'),
    color: alert ? '#991b1b' : (isNight ? '#fff' : 'inherit'),
    border: alert ? '1px solid #ef4444' : (isNight ? '1px solid #2c3e50' : '1px solid #eee'),
    transition: 'all 0.5s ease',
  }),
  notification: (type) => ({
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '15px 25px',
    borderRadius: '12px',
    background: type === 'danger' ? '#e74c3c' : (type === 'success' ? '#27ae60' : '#2c3e50'),
    color: 'white',
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    zIndex: 2000,
    maxWidth: '300px',
  }),
  ticker: {
    background: '#2e7d32',
    color: 'white',
    padding: '8px',
    borderRadius: '8px',
    marginBottom: '15px',
    fontSize: '0.85em',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  xpBar: {
    width: '100%',
    height: '6px',
    background: '#e2e8f0',
    borderRadius: '3px',
    marginTop: '4px',
    overflow: 'hidden'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3000,
    backdropFilter: 'blur(3px)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '20px',
    maxWidth: '400px',
    width: '90%',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
  }
};

// --- Constants ---
const BUILDING_TYPES = [
  { id: 'solar', name: 'Solar Farm', icon: '☀️', cost: 1200, energy: 35, pollution: -2, housing: 0, type: 'energy' },
  { id: 'wind', name: 'Wind Turbine', icon: '🌬️', cost: 900, energy: 20, pollution: -1, housing: 0, type: 'energy' },
  { id: 'housing', name: 'Eco-Hab', icon: '🏢', cost: 1500, energy: -18, pollution: 1, housing: 50, type: 'residential' },
  { id: 'park', name: 'City Park', icon: '🌳', cost: 600, energy: -2, pollution: -10, housing: 0, type: 'utility' },
  { id: 'recycling', name: 'Recycling Center', icon: '♻️', cost: 2200, energy: -12, pollution: -18, housing: 0, type: 'utility' },
  { id: 'hydro', name: 'Hydro Plant', icon: '🌊', cost: 4500, energy: 80, pollution: -5, housing: 0, type: 'energy', level: 3 },
];

const WEATHER_TYPES = [
  { id: 'sunny', name: 'Sunny', icon: '☀️', energyMod: 1.2, windMod: 0.8 },
  { id: 'cloudy', name: 'Cloudy', icon: '☁️', energyMod: 0.7, windMod: 1.0 },
  { id: 'rainy', name: 'Rainy', icon: '🌧️', energyMod: 0.4, windMod: 1.2 },
  { id: 'storm', name: 'Storm', icon: '⛈️', energyMod: 0.1, windMod: 2.0 }
];

const CITIZEN_QUOTES = [
  "Oxygen levels are looking great today!",
  "My electric car is charging so fast!",
  "The mayor is doing a decent job, I guess.",
  "Is that a smog cloud on the horizon?",
  "I'm voting for more parks next election!",
];

const DISASTERS = [
  { id: 'smog', name: 'Smog Inversion', icon: '🌫️', effect: 'Pollution +20, Happiness -15', color: '#7f8c8d' },
  { id: 'surge', name: 'Energy Surge', icon: '⚡', effect: 'Energy Grid unstable, -20% Money', color: '#f1c40f' },
  { id: 'heat', name: 'Heatwave', icon: '🔥', effect: 'Energy Demand +50%', color: '#e67e22' },
];

const LOCAL_STORAGE_KEY = 'eco_city_builder_save';

export default function App() {
  // State Initialization with LocalStorage
  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved).resources : {
      money: 3500,
      energy: 50,
      pollution: 5,
      population: 100,
      happiness: 90,
      xp: 0,
      level: 1
    };
  });

  const [buildings, setBuildings] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved).buildings : Array(12).fill(null);
  });

  const [policies, setPolicies] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved).policies : {
      greenGrant: false,
      carbonTax: false,
      nightLights: true
    };
  });

  const [currentView, setCurrentView] = useState('city');
  const [isNight, setIsNight] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [emergency, setEmergency] = useState(null);
  const [weather, setWeather] = useState(WEATHER_TYPES[0]);
  const [showBuildMenu, setShowBuildMenu] = useState(null); 
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [notification, setNotification] = useState(null);
  const [tickerMsg, setTickerMsg] = useState(CITIZEN_QUOTES[0]);

  // Trackers for charts/visuals
  const [history, setHistory] = useState([]);

  // Derived Values
  const xpToNext = resources.level * 1000;
  
  // Dynamic Grid Size based on level
  const totalSlots = Math.min(24, 12 + (resources.level - 1) * 4);
  useEffect(() => {
    if (buildings.length < totalSlots) {
      setBuildings(prev => [...prev, ...Array(totalSlots - prev.length).fill(null)]);
    }
  }, [totalSlots, buildings.length]);

  const ecoScore = useMemo(() => {
    const renewableRatio = Math.min(100, (buildings.filter(b => b?.type === 'energy').length * 15));
    const pollutionImpact = 100 - resources.pollution;
    return Math.round((renewableRatio + pollutionImpact + resources.happiness) / 3);
  }, [buildings, resources.pollution, resources.happiness]);

  // Persistent Saving Effect
  useEffect(() => {
    const saveData = { resources, buildings, policies };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saveData));
  }, [resources, buildings, policies]);

  // Day/Night, Weather & Disaster Loop
  useEffect(() => {
    if (gamePaused) return;
    const interval = setInterval(() => {
      setIsNight(prev => {
        const nextIsNight = !prev;
        // Change weather occasionally on day/night cycles
        if (Math.random() < 0.3) {
          setWeather(WEATHER_TYPES[Math.floor(Math.random() * WEATHER_TYPES.length)]);
        }
        return nextIsNight;
      });
      
      if (Math.random() < 0.1 && !emergency) {
        const d = DISASTERS[Math.floor(Math.random() * DISASTERS.length)];
        setEmergency(d);
        setNotification({ title: `ALERT: ${d.name}`, message: d.effect, type: "danger" });
        setTimeout(() => {
          setEmergency(null);
          setNotification(null);
        }, 12000);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [gamePaused, emergency]);

  // Ticker
  useEffect(() => {
    const ticker = setInterval(() => {
      setTickerMsg(CITIZEN_QUOTES[Math.floor(Math.random() * CITIZEN_QUOTES.length)]);
    }, 8000);
    return () => clearInterval(ticker);
  }, []);

  // Simulation Logic
  useEffect(() => {
    if (gamePaused) return;

    const timer = setInterval(() => {
      setResources(prev => {
        let energyProduction = buildings.reduce((acc, b) => {
          if (!b) return acc;
          let val = b.energy;
          
          // Weather and Night mods
          if (b.id === 'solar') {
             val *= (isNight ? 0.05 : weather.energyMod);
          } else if (b.id === 'wind') {
             val *= weather.windMod;
          }
          
          if (emergency?.id === 'heat' && b.id === 'housing') val *= 1.5;
          return acc + val;
        }, 0);

        let pollutionChange = buildings.reduce((acc, b) => acc + (b?.pollution || 0), 0);
        if (emergency?.id === 'smog') pollutionChange += 5;
        if (policies.carbonTax) pollutionChange -= 2;

        const housingTotal = buildings.reduce((acc, b) => acc + (b?.housing || 0), 0);
        
        const baseIncome = Math.floor(prev.population * 0.85);
        const policyBonus = policies.greenGrant ? -200 : 0;
        const taxBonus = policies.carbonTax ? 300 : 0;
        const surgePenalty = emergency?.id === 'surge' ? 0.8 : 1.0;
        
        const totalIncome = Math.floor((baseIncome + taxBonus + (baseIncome * (prev.happiness / 100))) * surgePenalty) + policyBonus;

        let newXp = prev.xp + 10 + (ecoScore / 10);
        let newLevel = prev.level;
        if (newXp >= xpToNext) {
          newXp -= xpToNext;
          newLevel++;
          setNotification({ title: "LEVEL UP!", message: `Your city reached Level ${newLevel}! More land unlocked.`, type: "success" });
        }

        // Store history for small trendline visualization
        setHistory(h => [...h.slice(-19), totalIncome]);

        return {
          ...prev,
          money: prev.money + totalIncome,
          energy: Math.max(-100, 40 + energyProduction),
          pollution: Math.min(100, Math.max(0, prev.pollution + pollutionChange)),
          population: Math.max(100, Math.floor(housingTotal + 100)),
          happiness: Math.max(0, Math.min(100, 
            prev.happiness 
            - (prev.pollution / 5) 
            + (prev.energy < 0 ? -15 : 1)
            + (emergency ? -10 : 0)
          )),
          xp: newXp,
          level: newLevel
        };
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [buildings, gamePaused, isNight, emergency, policies, ecoScore, xpToNext, weather]);

  const handleBuild = (typeObj) => {
    if (resources.money >= typeObj.cost) {
      const newBuildings = [...buildings];
      newBuildings[showBuildMenu] = { ...typeObj, uniqueId: Date.now() };
      setBuildings(newBuildings);
      setResources(prev => ({ ...prev, money: prev.money - typeObj.cost }));
      setShowBuildMenu(null);
    }
  };

  const handleDemolish = (index) => {
    if (resources.money >= 200) {
      const newBuildings = [...buildings];
      newBuildings[index] = null;
      setBuildings(newBuildings);
      setResources(prev => ({ ...prev, money: prev.money - 200 }));
      setSelectedDetail(null);
    }
  };

  const resetGame = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setBuildings(Array(12).fill(null));
    setResources({ money: 3500, energy: 50, pollution: 5, population: 100, happiness: 90, xp: 0, level: 1 });
    setEmergency(null);
    setIsNight(false);
    setCurrentView('city');
  };

  const renderView = () => {
    switch (currentView) {
      case 'city':
        return (
          <>
            <div style={styles.ticker}>
              <strong>LIVE FEED:</strong> {tickerMsg}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
              <div>
                <h2 style={{ margin: 0 }}>
                  {isNight ? '🌙' : weather.icon} {isNight ? 'Night' : weather.name}
                </h2>
                <div style={{ fontSize: '0.8em', color: '#666' }}>Level {resources.level} Metropolis | {buildings.filter(b => b).length} Buildings</div>
                <div style={{ width: '150px' }}>
                   <div style={styles.xpBar}>
                     <div style={{ height: '100%', background: '#3b82f6', width: `${(resources.xp / xpToNext) * 100}%`, transition: 'width 0.3s' }} />
                   </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#2e7d32' }}>${resources.money.toLocaleString()}</div>
                <div style={{ fontSize: '0.7em', color: '#666' }}>Avg. Income: +${Math.round(resources.population * 0.9)}/tick</div>
              </div>
            </div>
            <div style={styles.cityGrid}>
              {buildings.map((b, i) => (
                <div 
                  key={i} 
                  style={styles.buildingCard(!!b, isNight, !!emergency, weather.id)} 
                  onClick={() => !b ? setShowBuildMenu(i) : setSelectedDetail({ ...b, gridIndex: i })}
                >
                  <div style={styles.buildingIcon}>{b ? b.icon : '🏗️'}</div>
                  <strong style={{ fontSize: '0.85em' }}>{b ? b.name : 'Empty Lot'}</strong>
                  {b ? (
                    <div style={styles.badge(b.energy >= 0 ? (isNight && b.id === 'solar' ? '#f39c12' : '#4caf50') : '#f44336')}>
                      {isNight && b.id === 'solar' ? 'OFFLINE' : `${b.energy > 0 ? '+' : ''}${Math.round(b.energy * (b.id === 'solar' ? weather.energyMod : (b.id === 'wind' ? weather.windMod : 1)))}⚡`}
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
            <h2>Resource Management</h2>
            <div style={styles.resourceGrid}>
              {[
                { label: 'Funds', val: `$${resources.money.toLocaleString()}`, icon: '💰' },
                { label: 'Grid', val: `${Math.round(resources.energy)} MW`, icon: '⚡', alert: resources.energy < 0 },
                { label: 'Eco-Load', val: `${resources.pollution}%`, icon: '☁️', alert: resources.pollution > 50 },
                { label: 'Morale', val: `${Math.round(resources.happiness)}%`, icon: '😊' }
              ].map((stat, idx) => (
                <div key={idx} style={styles.statCard(isNight, stat.alert)}>
                  <div style={{ fontSize: '1.4rem' }}>{stat.icon}</div>
                  <strong style={{ fontSize: '1.1em' }}>{stat.val}</strong>
                  <div style={{ fontSize: '0.65em', textTransform: 'uppercase', opacity: 0.8 }}>{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div style={styles.panel(isNight ? '#2c3e50' : '#f8fafc', isNight ? '#34495e' : '#e2e8f0')}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                 <strong>Income History</strong>
                 <span style={{ fontSize: '0.8em', color: '#666' }}>Last 20 ticks</span>
               </div>
               <div style={{ height: '60px', display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                 {history.map((val, i) => (
                   <div key={i} style={{ 
                     flex: 1, 
                     height: `${Math.min(100, (val / 1000) * 100)}%`, 
                     background: val > 0 ? '#10b981' : '#ef4444',
                     borderRadius: '2px 2px 0 0'
                   }} />
                 ))}
               </div>
            </div>

            <div style={styles.panel(isNight ? '#2c3e50' : '#f1f8e9', isNight ? '#34495e' : '#c5e1a5')}>
               <div style={{ color: isNight ? '#fff' : '#2e7d32', display: 'flex', justifyContent: 'space-between' }}>
                 <strong>Sustainability Index</strong>
                 <span>{ecoScore}/100</span>
               </div>
               <div style={{ ...styles.xpBar, height: '12px', background: 'rgba(0,0,0,0.1)' }}>
                 <div style={{ height: '100%', background: '#10b981', width: `${ecoScore}%`, transition: 'width 1s ease' }} />
               </div>
            </div>
          </>
        );
      case 'policies':
        return (
          <div style={{ padding: '10px' }}>
            <h2>City Ordinances</h2>
            <div style={styles.panel('#fff', '#eee')}>
              {[
                { id: 'greenGrant', name: 'Rooftop Garden Subsidies', desc: 'Costs $200/tick, boosts Happiness +5', icon: '🌿' },
                { id: 'carbonTax', name: 'Industrial Carbon Tax', desc: 'Income +$300, Pollution -2/tick', icon: '🧾' },
                { id: 'nightLights', name: 'Smart Street Lighting', desc: 'Saves 10 Energy MW at night', icon: '💡' }
              ].map(p => (
                <div key={p.id} style={styles.statRow}>
                  <div>
                    <strong>{p.icon} {p.name}</strong>
                    <div style={{ fontSize: '0.8em', color: '#666' }}>{p.desc}</div>
                  </div>
                  <button 
                    style={styles.navButton(policies[p.id])}
                    onClick={() => setPolicies(prev => ({ ...prev, [p.id]: !prev[p.id] }))}
                  >
                    {policies[p.id] ? 'ENACTED' : 'ENACT'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div style={{ padding: '10px' }}>
            <h2>Global Settings</h2>
            <div style={styles.panel('#fff', '#eee')}>
              <div style={styles.statRow}>
                <span>Simulation Active</span>
                <button style={styles.navButton(!gamePaused)} onClick={() => setGamePaused(!gamePaused)}>
                  {gamePaused ? 'RESUME' : 'PAUSE'}
                </button>
              </div>
              <div style={styles.statRow}>
                <span>Clear All Data</span>
                <button 
                  style={{ ...styles.navButton(false), backgroundColor: '#e74c3c', color: 'white' }} 
                  onClick={() => window.confirm("Erase city and storage?") && resetGame()}
                >
                  RESET CITY
                </button>
              </div>
            </div>
            <p style={{ fontSize: '0.7em', color: '#999', textAlign: 'center' }}>
              Eco-City v2.5 | Performance: 60fps Target
            </p>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div style={{ ...styles.global, backgroundColor: isNight ? '#0f172a' : '#f4fbf4' }}>
      <div style={styles.appContainer}>
        <header style={styles.header}>
          <h1 style={{ color: isNight ? '#10b981' : '#2e7d32', margin: 0, letterSpacing: '-1px' }}>
            🌱 ECO-CITY <span style={{ fontWeight: 300 }}>MANAGER</span>
          </h1>
          <div style={{ fontSize: '0.8em', opacity: 0.7, color: isNight ? '#fff' : '#000' }}>
            Metropolis saved to local browser storage
          </div>
        </header>
        
        <nav style={styles.nav}>
          {['city', 'resources', 'policies', 'settings'].map(view => (
            <button key={view} style={styles.navButton(currentView === view)} onClick={() => setCurrentView(view)}>
              {view.toUpperCase()}
            </button>
          ))}
        </nav>

        <div style={styles.viewContainer}>
          <style>{`
            @keyframes pulse {
              0% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.4); }
              70% { box-shadow: 0 0 0 10px rgba(231, 76, 60, 0); }
              100% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0); }
            }
          `}</style>
          {renderView()}
        </div>

        {notification && (
          <div style={styles.notification(notification.type)}>
            <strong>{notification.title}</strong>
            <div style={{ fontSize: '0.8em' }}>{notification.message}</div>
          </div>
        )}

        {/* Build Selection Menu */}
        {showBuildMenu !== null && (
          <div style={styles.modalOverlay} onClick={() => setShowBuildMenu(null)}>
            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
              <h3 style={{ marginTop: 0 }}>Construction</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {BUILDING_TYPES.map(type => {
                  const isLocked = type.level && resources.level < type.level;
                  return (
                    <button 
                      key={type.id}
                      disabled={resources.money < type.cost || isLocked}
                      style={{ 
                        display: 'flex', justifyContent: 'space-between', padding: '12px',
                        borderRadius: '12px', border: '1px solid #ddd',
                        background: (resources.money >= type.cost && !isLocked) ? '#fff' : '#f9f9f9',
                        cursor: (resources.money >= type.cost && !isLocked) ? 'pointer' : 'not-allowed',
                        opacity: (resources.money >= type.cost && !isLocked) ? 1 : 0.6
                      }}
                      onClick={() => handleBuild(type)}
                    >
                      <div style={{ textAlign: 'left' }}>
                        <div>{type.icon} {type.name}</div>
                        <div style={{ fontSize: '0.65em', color: '#666' }}>Yield: {type.energy}MW | Poll: {type.pollution}</div>
                      </div>
                      <span style={{ fontWeight: 'bold' }}>${type.cost}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Building Details Modal */}
        {selectedDetail && (
          <div style={styles.modalOverlay} onClick={() => setSelectedDetail(null)}>
            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem' }}>{selectedDetail.icon}</div>
                <h2 style={{ marginBottom: '5px' }}>{selectedDetail.name}</h2>
                <div style={{ fontSize: '0.8em', color: '#666', marginBottom: '15px' }}>
                   "Running at {Math.round(100 * (selectedDetail.id === 'solar' ? weather.energyMod : 1))}% efficiency."
                </div>
                <div style={styles.panel('#f9f9f9', '#eee')}>
                  <div style={styles.statRow}><span>Power Capacity:</span> <strong>{selectedDetail.energy} MW</strong></div>
                  <div style={styles.statRow}><span>Environmental:</span> <strong>{selectedDetail.pollution}</strong></div>
                  {selectedDetail.housing > 0 && <div style={styles.statRow}><span>Housing:</span> <strong>{selectedDetail.housing}</strong></div>}
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <button style={{ ...styles.navButton(true), flex: 1 }} onClick={() => setSelectedDetail(null)}>BACK</button>
                  <button 
                    style={{ flex: 1, backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }} 
                    onClick={() => handleDemolish(selectedDetail.gridIndex)}
                  >
                    DEMOLISH ($200)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}