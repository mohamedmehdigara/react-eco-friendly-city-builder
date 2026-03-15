import React, { useState, useEffect, useMemo, useCallback, useReducer, useRef } from 'react';

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

const LOCAL_STORAGE_KEY = 'eco_city_builder_save_v3';

// --- Reducer Logic for Senior State Management ---
const initialState = {
  resources: { money: 3500, energy: 50, pollution: 5, population: 100, happiness: 90, xp: 0, level: 1 },
  buildings: Array(12).fill(null),
  policies: { greenGrant: false, carbonTax: false, nightLights: true },
  isNight: false,
  weather: WEATHER_TYPES[0],
  emergency: null,
  history: [],
  gamePaused: false,
};

function cityReducer(state, action) {
  switch (action.type) {
    case 'TICK':
      const { buildings, resources, isNight, weather, emergency, policies } = state;
      
      const energyProduction = buildings.reduce((acc, b) => {
        if (!b) return acc;
        let val = b.energy;
        if (b.id === 'solar') val *= (isNight ? 0.05 : weather.energyMod);
        else if (b.id === 'wind') val *= weather.windMod;
        if (emergency?.id === 'heat' && b.id === 'housing') val *= 1.5;
        return acc + val;
      }, 0);

      let pollutionChange = buildings.reduce((acc, b) => acc + (b?.pollution || 0), 0);
      if (emergency?.id === 'smog') pollutionChange += 5;
      if (policies.carbonTax) pollutionChange -= 2;

      const housingTotal = buildings.reduce((acc, b) => acc + (b?.housing || 0), 0);
      const baseIncome = Math.floor(resources.population * 0.85);
      const policyBonus = policies.greenGrant ? -200 : 0;
      const taxBonus = policies.carbonTax ? 300 : 0;
      const totalIncome = Math.floor((baseIncome + taxBonus + (baseIncome * (resources.happiness / 100))) * (emergency?.id === 'surge' ? 0.8 : 1.0)) + policyBonus;

      const xpToNext = resources.level * 1000;
      let newXp = resources.xp + 10;
      let newLevel = resources.level;
      if (newXp >= xpToNext) {
        newXp -= xpToNext;
        newLevel++;
      }

      return {
        ...state,
        history: [...state.history.slice(-19), totalIncome],
        resources: {
          ...resources,
          money: resources.money + totalIncome,
          energy: Math.max(-100, 40 + energyProduction),
          pollution: Math.min(100, Math.max(0, resources.pollution + pollutionChange)),
          population: Math.max(100, Math.floor(housingTotal + 100)),
          happiness: Math.max(0, Math.min(100, resources.happiness - (resources.pollution / 5) + (resources.energy < 0 ? -15 : 1) + (emergency ? -10 : 0))),
          xp: newXp,
          level: newLevel,
        }
      };
    case 'BUILD':
      const newBuildings = [...state.buildings];
      newBuildings[action.index] = { ...action.building, uniqueId: Date.now() };
      return { ...state, buildings: newBuildings, resources: { ...state.resources, money: state.resources.money - action.building.cost } };
    case 'DEMOLISH':
      const demBuildings = [...state.buildings];
      demBuildings[action.index] = null;
      return { ...state, buildings: demBuildings, resources: { ...state.resources, money: state.resources.money - 200 } };
    case 'TOGGLE_NIGHT':
      return { ...state, isNight: !state.isNight };
    case 'SET_WEATHER':
      return { ...state, weather: action.weather };
    case 'SET_EMERGENCY':
      return { ...state, emergency: action.emergency };
    case 'TOGGLE_POLICY':
      return { ...state, policies: { ...state.policies, [action.policy]: !state.policies[action.policy] } };
    case 'TOGGLE_PAUSE':
      return { ...state, gamePaused: !state.gamePaused };
    case 'EXPAND_GRID':
      return { ...state, buildings: [...state.buildings, ...Array(action.slots).fill(null)] };
    case 'LOAD_SAVE':
      return { ...state, ...action.data };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// --- Senior Component Optimization: Memoized Building Card ---
const BuildingTile = React.memo(({ index, building, isNight, emergency, weather, onBuild, onDetail }) => {
  return (
    <div 
      style={styles.buildingCard(!!building, isNight, !!emergency, weather.id)} 
      onClick={() => !building ? onBuild(index) : onDetail({ ...building, gridIndex: index })}
    >
      <div style={styles.buildingIcon}>{building ? building.icon : '🏗️'}</div>
      <strong style={{ fontSize: '0.85em' }}>{building ? building.name : 'Empty Lot'}</strong>
      {building ? (
        <div style={styles.badge(building.energy >= 0 ? (isNight && building.id === 'solar' ? '#f39c12' : '#4caf50') : '#f44336')}>
          {isNight && building.id === 'solar' ? 'OFFLINE' : `${building.energy > 0 ? '+' : ''}${Math.round(building.energy * (building.id === 'solar' ? weather.energyMod : (building.id === 'wind' ? weather.windMod : 1)))}⚡`}
        </div>
      ) : (
        <span style={{ fontSize: '0.7em', color: '#999' }}>Click to build</span>
      )}
    </div>
  );
});

// --- Custom Hook: useEcoEngine ---
function useEcoEngine() {
  const [state, dispatch] = useReducer(cityReducer, initialState, (init) => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : init;
  });

  const [notification, setNotification] = useState(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Main Simulation Ticks
  useEffect(() => {
    if (state.gamePaused) return;
    const simInterval = setInterval(() => dispatch({ type: 'TICK' }), 3000);
    const envInterval = setInterval(() => {
      dispatch({ type: 'TOGGLE_NIGHT' });
      if (Math.random() < 0.3) {
        dispatch({ type: 'SET_WEATHER', weather: WEATHER_TYPES[Math.floor(Math.random() * WEATHER_TYPES.length)] });
      }
    }, 15000);
    return () => { clearInterval(simInterval); clearInterval(envInterval); };
  }, [state.gamePaused]);

  // Disaster Logic
  useEffect(() => {
    if (state.gamePaused || state.emergency) return;
    const disasterCheck = setInterval(() => {
      if (Math.random() < 0.1) {
        const d = DISASTERS[Math.floor(Math.random() * DISASTERS.length)];
        dispatch({ type: 'SET_EMERGENCY', emergency: d });
        setNotification({ title: `ALERT: ${d.name}`, message: d.effect, type: "danger" });
        setTimeout(() => {
          dispatch({ type: 'SET_EMERGENCY', emergency: null });
          setNotification(null);
        }, 12000);
      }
    }, 20000);
    return () => clearInterval(disasterCheck);
  }, [state.gamePaused, state.emergency]);

  // Expansion Logic
  const totalSlotsNeeded = Math.min(24, 12 + (state.resources.level - 1) * 4);
  useEffect(() => {
    if (state.buildings.length < totalSlotsNeeded) {
      dispatch({ type: 'EXPAND_GRID', slots: totalSlotsNeeded - state.buildings.length });
    }
  }, [totalSlotsNeeded, state.buildings.length]);

  return { state, dispatch, notification, setNotification };
}

export default function App() {
  const { state, dispatch, notification } = useEcoEngine();
  const [currentView, setCurrentView] = useState('city');
  const [showBuildMenu, setShowBuildMenu] = useState(null); 
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [tickerMsg, setTickerMsg] = useState(CITIZEN_QUOTES[0]);

  const { resources, buildings, isNight, weather, emergency, policies, history, gamePaused } = state;

  // Derived Values
  const xpToNext = resources.level * 1000;
  const ecoScore = useMemo(() => {
    const renewableRatio = Math.min(100, (buildings.filter(b => b?.type === 'energy').length * 15));
    const pollutionImpact = 100 - resources.pollution;
    return Math.round((renewableRatio + pollutionImpact + resources.happiness) / 3);
  }, [buildings, resources.pollution, resources.happiness]);

  // Ticker
  useEffect(() => {
    const ticker = setInterval(() => {
      setTickerMsg(CITIZEN_QUOTES[Math.floor(Math.random() * CITIZEN_QUOTES.length)]);
    }, 8000);
    return () => clearInterval(ticker);
  }, []);

  const handleBuild = useCallback((typeObj) => {
    if (resources.money >= typeObj.cost) {
      dispatch({ type: 'BUILD', index: showBuildMenu, building: typeObj });
      setShowBuildMenu(null);
    }
  }, [resources.money, showBuildMenu, dispatch]);

  const handleDemolish = useCallback((index) => {
    if (resources.money >= 200) {
      dispatch({ type: 'DEMOLISH', index });
      setSelectedDetail(null);
    }
  }, [resources.money, dispatch]);

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
                <h2 style={{ margin: 0, color: isNight ? '#10b981' : '#2e7d32' }}>
                  {isNight ? '🌙' : weather.icon} {isNight ? 'Night' : weather.name}
                </h2>
                <div style={{ fontSize: '0.8em', color: isNight ? '#94a3b8' : '#666' }}>Level {resources.level} Metropolis</div>
                <div style={{ width: '150px' }}>
                   <div style={styles.xpBar}>
                     <div style={{ height: '100%', background: '#3b82f6', width: `${(resources.xp / xpToNext) * 100}%`, transition: 'width 0.3s' }} />
                   </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#2e7d32' }}>${resources.money.toLocaleString()}</div>
                <div style={{ fontSize: '0.7em', color: isNight ? '#94a3b8' : '#666' }}>Sustainability: {ecoScore}%</div>
              </div>
            </div>
            <div style={styles.cityGrid}>
              {buildings.map((b, i) => (
                <BuildingTile 
                  key={b?.uniqueId || i}
                  index={i}
                  building={b}
                  isNight={isNight}
                  emergency={emergency}
                  weather={weather}
                  onBuild={setShowBuildMenu}
                  onDetail={setSelectedDetail}
                />
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
            
            <div style={styles.panel(isNight ? '#1e293b' : '#f8fafc', isNight ? '#334155' : '#e2e8f0')}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                 <strong style={{ color: isNight ? '#fff' : 'inherit' }}>Income History</strong>
                 <span style={{ fontSize: '0.8em', color: '#64748b' }}>Real-time Ticks</span>
               </div>
               <div style={{ height: '60px', display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                 {history.map((val, i) => (
                   <div key={i} style={{ 
                     flex: 1, 
                     height: `${Math.min(100, (Math.abs(val) / 2000) * 100)}%`, 
                     background: val >= 0 ? '#10b981' : '#ef4444',
                     borderRadius: '2px 2px 0 0'
                   }} />
                 ))}
               </div>
            </div>
          </>
        );
      case 'policies':
        return (
          <div style={{ padding: '10px' }}>
            <h2>City Ordinances</h2>
            <div style={styles.panel(isNight ? '#1e293b' : '#fff', isNight ? '#334155' : '#eee')}>
              {[
                { id: 'greenGrant', name: 'Rooftop Garden Subsidies', desc: 'Costs $200/tick, boosts Happiness +5', icon: '🌿' },
                { id: 'carbonTax', name: 'Industrial Carbon Tax', desc: 'Income +$300, Pollution -2/tick', icon: '🧾' },
                { id: 'nightLights', name: 'Smart Street Lighting', desc: 'Saves 10 Energy MW at night', icon: '💡' }
              ].map(p => (
                <div key={p.id} style={{ ...styles.statRow, borderBottom: isNight ? '1px solid #334155' : '1px solid #f0f0f0' }}>
                  <div style={{ color: isNight ? '#fff' : 'inherit' }}>
                    <strong>{p.icon} {p.name}</strong>
                    <div style={{ fontSize: '0.8em', color: '#64748b' }}>{p.desc}</div>
                  </div>
                  <button 
                    style={styles.navButton(policies[p.id])}
                    onClick={() => dispatch({ type: 'TOGGLE_POLICY', policy: p.id })}
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
            <div style={styles.panel(isNight ? '#1e293b' : '#fff', isNight ? '#334155' : '#eee')}>
              <div style={styles.statRow}>
                <span style={{ color: isNight ? '#fff' : 'inherit' }}>Simulation Engine</span>
                <button style={styles.navButton(!gamePaused)} onClick={() => dispatch({ type: 'TOGGLE_PAUSE' })}>
                  {gamePaused ? 'RESUME' : 'PAUSE'}
                </button>
              </div>
              <div style={styles.statRow}>
                <span style={{ color: isNight ? '#fff' : 'inherit' }}>Cloud Persistence</span>
                <button 
                  style={{ ...styles.navButton(false), backgroundColor: '#ef4444', color: 'white' }} 
                  onClick={() => window.confirm("Erase city and storage?") && dispatch({ type: 'RESET' })}
                >
                  PURGE DATA
                </button>
              </div>
            </div>
            <p style={{ fontSize: '0.7em', color: '#64748b', textAlign: 'center' }}>
              Eco-City v3.0 Senior Architect Edition
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
          <div style={{ fontSize: '0.8em', opacity: 0.7, color: isNight ? '#94a3b8' : '#000' }}>
            Senior State Engine Active | LocalStorage v3
          </div>
        </header>
        
        <nav style={styles.nav}>
          {['city', 'resources', 'policies', 'settings'].map(view => (
            <button key={view} style={styles.navButton(currentView === view)} onClick={() => setCurrentView(view)}>
              {view.toUpperCase()}
            </button>
          ))}
        </nav>

        <div style={{ ...styles.viewContainer, background: isNight ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.9)' }}>
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

        {selectedDetail && (
          <div style={styles.modalOverlay} onClick={() => setSelectedDetail(null)}>
            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem' }}>{selectedDetail.icon}</div>
                <h2 style={{ marginBottom: '5px' }}>{selectedDetail.name}</h2>
                <div style={styles.panel('#f9f9f9', '#eee')}>
                  <div style={styles.statRow}><span>Power:</span> <strong>{selectedDetail.energy} MW</strong></div>
                  <div style={styles.statRow}><span>Eco-Impact:</span> <strong>{selectedDetail.pollution}</strong></div>
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