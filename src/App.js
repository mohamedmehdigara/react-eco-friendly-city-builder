import React, { useReducer, useEffect, useState, useMemo } from 'react';

// --- Constants & Configuration ---
const TICK_RATE = 3000; 
const SAVE_KEY = 'eco_metropolis_v8_final';

const REGIONS = {
  SURFACE: { id: 'surface', name: 'Surface Core', icon: '🌍', bg: 'bg-emerald-50', color: 'emerald' },
  SUBSURFACE: { id: 'subsurface', name: 'Geo-Vaults', icon: '🌋', bg: 'bg-orange-50', color: 'orange' },
  ORBIT: { id: 'orbit', name: 'Orbital Ring', icon: '🛰️', bg: 'bg-slate-900', color: 'indigo' }
};

const BUILDING_DATA = {
  SOLAR: { id: 'solar', name: 'Solar Array', icon: '☀️', cost: 1200, energy: 45, water: -5, food: 0, pollution: -2, housing: 0, unlockLevel: 1, region: ['surface', 'orbit'] },
  WIND: { id: 'wind', name: 'Wind Turbine', icon: '🌬️', cost: 900, energy: 30, water: 0, food: 0, pollution: -1, housing: 0, unlockLevel: 1, region: ['surface'] },
  HABITAT: { id: 'habitat', name: 'Eco-Habitat', icon: '🏘️', cost: 1500, energy: -20, water: -25, food: -10, pollution: 2, housing: 60, unlockLevel: 1, region: ['surface', 'subsurface'] },
  FARM: { id: 'farm', name: 'Vertical Farm', icon: '🥬', cost: 2200, energy: -35, water: -45, food: 90, pollution: -5, housing: 0, unlockLevel: 2, region: ['surface', 'subsurface'] },
  WELL: { id: 'well', name: 'Atmospheric Well', icon: '💧', cost: 1900, energy: -30, water: 110, food: 0, pollution: -3, housing: 0, unlockLevel: 2, region: ['surface'] },
  RECYCLE: { id: 'recycle', name: 'Plasma Recycler', icon: '♻️', cost: 3500, energy: -50, water: -20, food: 0, pollution: -25, housing: 0, unlockLevel: 3, region: ['surface', 'subsurface'] },
  FOREST: { id: 'forest', name: 'Urban Forest', icon: '🌳', cost: 800, energy: -5, water: -15, food: 10, pollution: -15, housing: 0, unlockLevel: 2, region: ['surface'] },
  TECH_HUB: { id: 'tech', name: 'Fusion Lab', icon: '⚛️', cost: 12000, energy: 500, water: -100, food: 0, pollution: -10, housing: 0, unlockLevel: 5, region: ['surface', 'orbit'] },
  GEOTHERMAL: { id: 'geo', name: 'Core Tap', icon: '🔥', cost: 5000, energy: 250, water: -20, food: 0, pollution: 5, housing: 0, unlockLevel: 3, region: ['subsurface'] },
  SCIENCE_SAT: { id: 'sat', name: 'Research Sat', icon: '🛰️', cost: 8000, energy: -100, water: 0, food: 0, pollution: 0, housing: 0, science: 25, unlockLevel: 4, region: ['orbit'] },
};

const POLICIES = [
  { id: 'carbon_tax', name: 'Carbon Tax', icon: '🧾', cost: 0, effect: '+$200/tick, -10 Happiness', active: false, level: 3 },
  { id: 'plastic_ban', name: 'Plastic Ban', icon: '🚫', cost: 500, effect: '-10 Pollution/tick, -5 Happiness', active: false, level: 2 },
  { id: 'subsidies', name: 'Green Subsidies', icon: '💸', cost: 1000, effect: 'Buildings 10% cheaper, -$300/tick', active: false, level: 4 },
];

const WEATHER_EFFECTS = [
  { id: 'sunny', name: 'Clear Skies', icon: '☀️', solarMod: 1.5, windMod: 0.5 },
  { id: 'cloudy', name: 'Overcast', icon: '☁️', solarMod: 0.6, windMod: 1.0 },
  { id: 'windy', name: 'Gale Force', icon: '🍃', solarMod: 0.8, windMod: 2.5 },
  { id: 'storm', name: 'Thunderstorm', icon: '⛈️', solarMod: 0.1, windMod: 1.8 },
];

const DISASTERS = [
  { id: 'heatwave', name: 'Heatwave', icon: '🔥', effect: 'Water usage x2', duration: 4 },
  { id: 'smog', name: 'Smog Alert', icon: '🌫️', effect: 'Happiness -20', duration: 3 },
  { id: 'grid_fail', name: 'Grid Strain', icon: '🔌', effect: 'Energy production /2', duration: 2 },
];

const initialState = {
  city: {
    name: "Neo-Kyoto",
    level: 1,
    xp: 0,
    grids: {
      surface: Array(16).fill(null),
      subsurface: Array(16).fill(null),
      orbit: Array(16).fill(null)
    },
    activeRegion: 'surface',
    hasEducationCenter: false,
    activePolicies: [],
  },
  resources: {
    money: 8000,
    energy: 500,
    water: 500,
    food: 500,
    pollution: 10,
    population: 0,
    happiness: 90,
    researchPoints: 0,
  },
  environment: {
    weather: WEATHER_EFFECTS[0],
    isNight: false,
    activeDisaster: null,
    disasterTicks: 0,
  },
  gamePaused: false,
};

function gameReducer(state, action) {
  if (state.gamePaused && !['TOGGLE_PAUSE', 'LOAD_SAVE', 'RESET'].includes(action.type)) return state;

  switch (action.type) {
    case 'TICK': {
      const { city, resources, environment } = state;
      
      // Calculate production across ALL grids
      let totalProd = { energy: 0, water: 0, food: 0, pollution: 0, housing: 0, science: 0 };
      
      Object.keys(city.grids).forEach(regionKey => {
        city.grids[regionKey].forEach(b => {
          if (!b) return;
          let bEnergy = b.energy;
          if (b.id === 'solar') bEnergy *= (environment.isNight ? 0.05 : environment.weather.solarMod);
          if (b.id === 'wind') bEnergy *= environment.weather.windMod;
          if (environment.activeDisaster?.id === 'grid_fail') bEnergy *= 0.5;

          totalProd.energy += bEnergy;
          totalProd.water += (b.water || 0);
          totalProd.food += (b.food || 0);
          totalProd.pollution += b.pollution;
          totalProd.housing += b.housing;
          totalProd.science += (b.science || 0);
        });
      });

      const population = totalProd.housing + 100;
      let waterNeeds = population * 0.25;
      if (environment.activeDisaster?.id === 'heatwave') waterNeeds *= 2;

      const energyNeeds = population * 0.15;
      const foodNeeds = population * 0.2;

      let revenue = Math.floor(population * (resources.happiness / 100) * 1.5);
      let polChange = totalProd.pollution;
      let hapChange = 1;

      if (city.activePolicies.includes('carbon_tax')) { revenue += 200; hapChange -= 2; }
      if (city.activePolicies.includes('plastic_ban')) { polChange -= 10; hapChange -= 1; }
      if (city.activePolicies.includes('subsidies')) { revenue -= 300; }

      if (resources.energy < 5) hapChange -= 10;
      if (resources.water < 5) hapChange -= 15;
      if (resources.food < 5) hapChange -= 10;
      if (environment.activeDisaster?.id === 'smog') hapChange -= 20;

      let newXp = city.xp + 50;
      let newLevel = city.level;
      const xpToNext = city.level * 2000;
      if (newXp >= xpToNext) { newXp = 0; newLevel += 1; }

      let nextDisaster = environment.activeDisaster;
      let nextTicks = environment.disasterTicks - 1;
      if (nextTicks <= 0) { nextDisaster = null; nextTicks = 0; }

      if (!nextDisaster && Math.random() < 0.02) {
        nextDisaster = DISASTERS[Math.floor(Math.random() * DISASTERS.length)];
        nextTicks = nextDisaster.duration;
      }

      return {
        ...state,
        city: { ...city, xp: newXp, level: newLevel },
        resources: {
          money: resources.money + revenue,
          energy: Math.max(0, resources.energy + totalProd.energy - energyNeeds),
          water: Math.max(0, resources.water + totalProd.water - waterNeeds),
          food: Math.max(0, resources.food + totalProd.food - foodNeeds),
          pollution: Math.max(0, Math.min(100, resources.pollution + polChange)),
          population,
          happiness: Math.max(0, Math.min(100, resources.happiness + hapChange)),
          researchPoints: resources.researchPoints + totalProd.science + (city.hasEducationCenter ? 15 : 0),
        },
        environment: {
          ...environment,
          activeDisaster: nextDisaster,
          disasterTicks: nextTicks,
        }
      };
    }

    case 'BUILD': {
      const { index, building } = action;
      let cost = building.cost;
      if (state.city.activePolicies.includes('subsidies')) cost *= 0.9;
      if (state.resources.money < cost) return state;

      const activeRegion = state.city.activeRegion;
      const newGrid = [...state.city.grids[activeRegion]];
      newGrid[index] = { ...building, instanceId: Date.now() };
      
      return {
        ...state,
        city: { 
          ...state.city, 
          grids: { ...state.city.grids, [activeRegion]: newGrid }
        },
        resources: { ...state.resources, money: state.resources.money - cost }
      };
    }

    case 'SET_REGION':
      return { ...state, city: { ...state.city, activeRegion: action.region }};

    case 'TOGGLE_POLICY': {
      const { id } = action;
      const activePolicies = state.city.activePolicies.includes(id)
        ? state.city.activePolicies.filter(p => p !== id)
        : [...state.city.activePolicies, id];
      return { ...state, city: { ...state.city, activePolicies } };
    }

    case 'BUILD_EDUCATION': 
      return { ...state, city: { ...state.city, hasEducationCenter: true }, resources: { ...state.resources, money: state.resources.money - 3000 } };
    
    case 'DEMOLISH': {
      const activeRegion = state.city.activeRegion;
      const newGrid = [...state.city.grids[activeRegion]];
      newGrid[action.index] = null;
      return { 
        ...state, 
        city: { ...state.city, grids: { ...state.city.grids, [activeRegion]: newGrid } }, 
        resources: { ...state.resources, money: Math.max(0, state.resources.money - 150) } 
      };
    }

    case 'CYCLE_WEATHER':
      return {
        ...state,
        environment: {
          ...state.environment,
          weather: WEATHER_EFFECTS[Math.floor(Math.random() * WEATHER_EFFECTS.length)],
          isNight: Math.random() > 0.7 ? !state.environment.isNight : state.environment.isNight
        }
      };

    case 'TOGGLE_PAUSE': return { ...state, gamePaused: !state.gamePaused };
    case 'LOAD_SAVE': return action.payload;
    case 'RESET': return initialState;
    default: return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [activeTab, setActiveTab] = useState('city');
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) dispatch({ type: 'LOAD_SAVE', payload: JSON.parse(saved) });
  }, []);

  useEffect(() => {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const tick = setInterval(() => dispatch({ type: 'TICK' }), TICK_RATE);
    const env = setInterval(() => dispatch({ type: 'CYCLE_WEATHER' }), 18000);
    return () => { clearInterval(tick); clearInterval(env); };
  }, [state.gamePaused]);

  const xpPercent = (state.city.xp / (state.city.level * 2000)) * 100;
  const activeRegionData = REGIONS[state.city.activeRegion.toUpperCase()];

  return (
    <div className={`min-h-screen transition-all duration-1000 font-sans ${state.city.activeRegion === 'orbit' ? 'bg-indigo-950 text-indigo-100' : state.environment.isNight ? 'bg-slate-950 text-slate-100' : 'bg-blue-50 text-slate-900'}`}>
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        
        {/* Top Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
              <span className="text-emerald-500">Eco</span>Metropolis
              <span className="text-xs bg-emerald-500 text-white px-3 py-1 rounded-full uppercase tracking-widest">v8</span>
            </h1>
            <div className="flex items-center gap-4 mt-4">
               <span className="text-[10px] font-bold uppercase opacity-60">Level {state.city.level}</span>
               <div className="w-48 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-white/20">
                 <div className="bg-emerald-400 h-full transition-all duration-700" style={{ width: `${xpPercent}%` }}></div>
               </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {state.environment.activeDisaster && (
              <div className="bg-red-500 text-white px-4 py-2 rounded-2xl font-black text-xs flex items-center gap-2 animate-pulse shadow-lg shadow-red-500/30">
                <span>{state.environment.activeDisaster.icon}</span>
                <span>{state.environment.activeDisaster.name.toUpperCase()}</span>
              </div>
            )}
            <div className={`px-4 py-2 rounded-2xl font-black text-xs uppercase shadow-sm border ${state.environment.isNight ? 'bg-slate-800 border-slate-700' : 'bg-white border-white'}`}>
              {state.environment.isNight ? '🌙 Night' : `${state.environment.weather.icon} ${state.environment.weather.name}`}
            </div>
            <button onClick={() => dispatch({ type: 'TOGGLE_PAUSE' })} className="px-6 py-2 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all">
              {state.gamePaused ? '▶️ Resume' : '⏸️ Pause'}
            </button>
          </div>
        </header>

        {/* Resource Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
          {[
            { label: 'Funds', val: `$${state.resources.money.toLocaleString()}`, icon: '💰', col: 'text-emerald-500' },
            { label: 'Power', val: `${Math.round(state.resources.energy)}`, icon: '⚡', col: 'text-blue-500' },
            { label: 'Water', val: `${Math.round(state.resources.water)}`, icon: '💧', col: 'text-cyan-500' },
            { label: 'Food', val: `${Math.round(state.resources.food)}`, icon: '🍎', col: 'text-orange-500' },
            { label: 'Smog', val: `${state.resources.pollution}%`, icon: '🌫️', col: 'text-slate-500' },
            { label: 'Happy', val: `${state.resources.happiness}%`, icon: '😊', col: 'text-pink-500' },
            { label: 'Pop', val: state.resources.population, icon: '👥', col: 'text-indigo-500' },
            { label: 'Science', val: state.resources.researchPoints, icon: '🧪', col: 'text-purple-500' },
          ].map(r => (
            <div key={r.label} className={`p-3 rounded-2xl border bg-white/40 backdrop-blur-sm shadow-sm ${state.environment.isNight ? 'border-slate-800' : 'border-white'}`}>
              <div className="text-[9px] font-black uppercase tracking-tighter opacity-40 mb-1">{r.label}</div>
              <div className={`text-sm font-black flex items-center gap-1 ${r.col}`}>
                <span>{r.icon}</span> {r.val}
              </div>
            </div>
          ))}
        </div>

        {/* Region Selector */}
        <div className="flex gap-2 mb-6 justify-center">
          {Object.values(REGIONS).map(r => (
            <button
              key={r.id}
              onClick={() => dispatch({ type: 'SET_REGION', region: r.id })}
              className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 border-2 ${
                state.city.activeRegion === r.id 
                ? `bg-${r.color}-500 text-white border-${r.color}-400 shadow-lg` 
                : 'bg-white/10 border-transparent hover:bg-white/30'
              }`}
            >
              <span>{r.icon}</span> {r.name}
            </button>
          ))}
        </div>

        {/* Main Tabs */}
        <nav className="flex gap-2 mb-8 bg-white/20 p-1.5 rounded-3xl backdrop-blur-md">
          {['city', 'blueprints', 'policies', 'education'].map(t => (
            <button 
              key={t}
              onClick={() => setActiveTab(t)}
              className={`flex-1 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === t ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/30' : 'hover:bg-white/40'}`}
            >
              {t}
            </button>
          ))}
        </nav>

        {/* Main Viewport */}
        <main className="min-h-[500px]">
          {activeTab === 'city' && (
            <div className={`grid grid-cols-4 gap-4 p-8 rounded-[3.5rem] border-4 border-dashed transition-all duration-500 ${state.city.activeRegion === 'orbit' ? 'bg-indigo-900/20 border-indigo-500/30' : state.city.activeRegion === 'subsurface' ? 'bg-orange-900/10 border-orange-500/30' : 'bg-white/30 border-white/50 backdrop-blur-md shadow-2xl'}`}>
              {state.city.grids[state.city.activeRegion].map((b, i) => (
                <div 
                  key={i}
                  onClick={() => setSelectedSlot(i)}
                  className={`aspect-square rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all transform hover:scale-105 active:scale-95 group ${
                    b ? 'bg-white shadow-xl scale-100 ring-4 ring-emerald-500/10' : 'bg-white/10 border-2 border-dashed border-white/20 opacity-40 hover:opacity-100 hover:border-white/50'
                  }`}
                >
                  <span className="text-5xl drop-shadow-md group-hover:rotate-12 transition-transform">{b?.icon || '＋'}</span>
                  <span className={`text-[9px] font-black uppercase mt-3 tracking-tighter ${b ? 'opacity-40' : 'opacity-20'}`}>{b?.name || 'Sector'}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'blueprints' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-5">
              {Object.values(BUILDING_DATA).filter(b => b.region.includes(state.city.activeRegion)).map(b => (
                <div key={b.id} className={`p-6 rounded-[2.5rem] bg-white shadow-sm border border-emerald-50 flex items-center gap-6 group hover:shadow-xl transition-all ${state.city.level < b.unlockLevel ? 'grayscale opacity-50' : ''}`}>
                  <span className="text-5xl group-hover:scale-110 transition-transform">{b.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-black text-xs uppercase tracking-tight text-slate-800">{b.name}</h4>
                    <div className="flex gap-2 text-[10px] font-bold text-slate-400 mt-1">
                      <span>⚡{b.energy}</span> <span>💧{b.water}</span> <span>🌫️{b.pollution}</span>
                      {b.science && <span className="text-purple-500">🧪{b.science}</span>}
                    </div>
                  </div>
                  <div className="text-emerald-600 font-black italic">${b.cost}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {POLICIES.map(p => (
                <button
                  key={p.id}
                  disabled={state.city.level < p.level}
                  onClick={() => dispatch({ type: 'TOGGLE_POLICY', id: p.id })}
                  className={`p-8 rounded-[3rem] text-left transition-all border-4 ${
                    state.city.activePolicies.includes(p.id) 
                      ? 'bg-emerald-500 text-white border-emerald-400 shadow-xl shadow-emerald-500/20' 
                      : 'bg-white text-slate-900 border-transparent'
                  } ${state.city.level < p.level ? 'opacity-30 grayscale cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-4xl">{p.icon}</span>
                    <div>
                      <h3 className="font-black text-lg uppercase leading-none">{p.name}</h3>
                      <p className="text-[10px] font-bold opacity-60 uppercase mt-1">Unlocks at Level {p.level}</p>
                    </div>
                  </div>
                  <p className={`text-xs font-bold leading-relaxed ${state.city.activePolicies.includes(p.id) ? 'text-emerald-50' : 'text-slate-500'}`}>
                    {p.effect}
                  </p>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'education' && (
            <div className="bg-white/40 p-16 rounded-[4rem] text-center border-4 border-white/50 backdrop-blur-xl">
              {state.city.hasEducationCenter ? (
                <div className="space-y-8">
                  <span className="text-8xl animate-bounce inline-block">🎓</span>
                  <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-800">Institute of Ecology</h2>
                  <p className="text-slate-500 font-bold uppercase text-xs tracking-[.4em]">Advanced research protocols active</p>
                  <div className="flex justify-center gap-4">
                    <div className="p-8 bg-white rounded-[3rem] shadow-inner text-purple-600 font-black uppercase text-sm border-b-4 border-purple-200">
                      Auto-Generating +15 Science / Tick
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 space-y-6">
                  <span className="text-8xl opacity-20 grayscale">🏛️</span>
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-800">Research Hub Offline</h2>
                  <p className="text-slate-400 text-sm max-w-xs mx-auto mb-8 font-bold uppercase">Enable Science generation and unlock high-tier green tech.</p>
                  <button 
                    onClick={() => dispatch({ type: 'BUILD_EDUCATION' })}
                    disabled={state.resources.money < 3000}
                    className="px-12 py-6 bg-purple-600 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-2xl hover:scale-110 active:scale-95 transition-all disabled:opacity-30"
                  >
                    Found Institute ($3,000)
                  </button>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Selection Modal */}
        {selectedSlot !== null && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white text-slate-900 rounded-[4rem] p-12 max-w-2xl w-full shadow-2xl animate-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                  {state.city.grids[state.city.activeRegion][selectedSlot] ? 'Site Management' : `Deploy to ${activeRegionData.name}`}
                </h2>
                <button onClick={() => setSelectedSlot(null)} className="text-5xl font-thin hover:rotate-90 transition-transform">×</button>
              </div>

              {state.city.grids[state.city.activeRegion][selectedSlot] ? (
                <div className="space-y-6">
                  <div className="bg-emerald-50 p-12 rounded-[3rem] border-4 border-emerald-100 flex items-center gap-10">
                    <span className="text-9xl drop-shadow-xl">{state.city.grids[state.city.activeRegion][selectedSlot].icon}</span>
                    <div>
                      <h3 className="text-3xl font-black uppercase tracking-tight leading-none">{state.city.grids[state.city.activeRegion][selectedSlot].name}</h3>
                      <p className="text-emerald-600 font-black text-xs uppercase tracking-widest mt-4">Structural integrity 100%</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { dispatch({ type: 'DEMOLISH', index: selectedSlot }); setSelectedSlot(null); }}
                    className="w-full py-8 rounded-[2rem] bg-red-100 text-red-600 font-black uppercase tracking-widest hover:bg-red-200 transition-all border-b-8 border-red-200"
                  >
                    Demolish Site ($150)
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2">
                  {Object.values(BUILDING_DATA)
                    .filter(b => b.region.includes(state.city.activeRegion))
                    .map(b => {
                      const locked = state.city.level < b.unlockLevel;
                      const broke = state.resources.money < b.cost;
                      return (
                        <button
                          key={b.id}
                          disabled={locked || broke}
                          onClick={() => { dispatch({ type: 'BUILD', index: selectedSlot, building: b }); setSelectedSlot(null); }}
                          className={`p-6 rounded-[2.5rem] border-4 flex flex-col items-center gap-2 transition-all group ${
                            locked || broke ? 'opacity-20 grayscale cursor-not-allowed' : 'border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 shadow-sm'
                          }`}
                        >
                          <span className="text-5xl group-hover:scale-110 transition-transform">{b.icon}</span>
                          <span className="font-black text-[10px] uppercase text-center mt-2 leading-none">{b.name}</span>
                          <span className="text-emerald-600 font-black text-xs italic mt-1">${b.cost}</span>
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}