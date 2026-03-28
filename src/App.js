import React, { useReducer, useEffect, useState } from 'react';

// --- Constants & Configuration ---
const TICK_RATE = 2000;
const REGIONS = {
  SURFACE: { id: 'surface', name: 'Surface Core', icon: '🌍', color: 'blue' },
  SUBSURFACE: { id: 'subsurface', name: 'Geo-Vaults', icon: '🌋', color: 'orange' },
  ORBIT: { id: 'orbit', name: 'Orbital Ring', icon: '🛰️', color: 'indigo' }
};

const SPECIALIZATIONS = {
  NONE: { id: 'none', name: 'Neutral', buff: 'No active modifiers', effect: {} },
  INDUSTRIAL: { id: 'ind', name: 'Industrial', buff: '+20% Jobs, +10% Pollution', effect: { jobs: 1.2, pollution: 1.1 } },
  ECOLOGICAL: { id: 'eco', name: 'Eco-Park', buff: '-30% Pollution, -10% Energy', effect: { pollution: 0.7, energy: 0.9 } },
  RESIDENTIAL: { id: 'res', name: 'Urban Hub', buff: '+25% Housing, +10% Water Req', effect: { housing: 1.25, water: 1.1 } }
};

const BUILDING_DATA = {
  SOLAR: { id: 'solar', name: 'Solar Array', icon: '☀️', cost: 1200, energy: 50, water: -5, pollution: -2, jobs: 5, region: ['surface', 'orbit'] },
  WIND: { id: 'wind', name: 'Wind Turbine', icon: '🌬️', cost: 950, energy: 35, water: 0, pollution: -1, jobs: 3, region: ['surface'] },
  HABITAT: { id: 'habitat', name: 'Eco-Habitat', icon: '🏘️', cost: 1600, energy: -25, water: -30, food: -15, pollution: 2, housing: 60, jobs: 0, region: ['surface', 'subsurface'] },
  FARM: { id: 'farm', name: 'Vertical Farm', icon: '🥬', cost: 2400, energy: -40, water: -50, food: 110, pollution: -5, jobs: 20, region: ['surface', 'subsurface'] },
  WELL: { id: 'well', name: 'Atmospheric Well', icon: '💧', cost: 2000, energy: -35, water: 150, pollution: -3, jobs: 10, region: ['surface'] },
  RECYCLE: { id: 'recycle', name: 'Plasma Recycler', icon: '♻️', cost: 4200, energy: -60, water: -30, pollution: -40, jobs: 30, region: ['surface', 'subsurface'] },
  FUSION: { id: 'fusion', name: 'Fusion Core', icon: '⚛️', cost: 18000, energy: 1200, water: -200, pollution: -5, jobs: 80, region: ['surface', 'orbit'] },
};

const initialState = {
  city: {
    level: 1,
    xp: 0,
    activeRegion: 'surface',
    grids: { surface: Array(16).fill(null), subsurface: Array(16).fill(null), orbit: Array(16).fill(null) },
    specializations: { surface: 'none', subsurface: 'none', orbit: 'none' },
    activePolicies: [],
    unlockedTechs: [],
  },
  resources: {
    money: 25000,
    energy: 500,
    water: 500,
    food: 500,
    pollution: 15,
    population: 150,
    happiness: 90,
  },
  market: { energyPrice: 12, waterPrice: 8, foodPrice: 15 },
  gamePaused: false,
};

function gameReducer(state, action) {
  if (state.gamePaused && action.type !== 'TOGGLE_PAUSE') return state;

  switch (action.type) {
    case 'TICK': {
      const { city, resources } = state;
      let net = { energy: 0, water: 0, food: 0, pollution: 0, housing: 0, jobs: 0 };

      Object.keys(city.grids).forEach(rId => {
        const specId = city.specializations[rId];
        const spec = SPECIALIZATIONS[specId.toUpperCase()] || SPECIALIZATIONS.NONE;
        
        city.grids[rId].forEach(b => {
          if (!b) return;
          let bE = b.energy || 0;
          let bP = b.pollution || 0;
          let bH = b.housing || 0;
          let bJ = b.jobs || 0;

          // Apply specializations
          if (spec.effect.energy) bE *= spec.effect.energy;
          if (spec.effect.pollution) bP *= spec.effect.pollution;
          if (spec.effect.housing) bH *= spec.effect.housing;
          if (spec.effect.jobs) bJ *= spec.effect.jobs;

          net.energy += bE;
          net.water += b.water || 0;
          net.food += b.food || 0;
          net.pollution += bP;
          net.housing += bH;
          net.jobs += bJ;
        });
      });

      const pop = Math.max(150, Math.floor(net.housing + 100));
      const consumption = { energy: pop * 0.2, water: pop * 0.3, food: pop * 0.25 };
      const revenue = Math.floor(pop * (resources.happiness / 100) * 5);
      
      let newLevel = city.level;
      let newXp = city.xp + 25;
      if (newXp >= 1000 * city.level) { newXp = 0; newLevel++; }

      return {
        ...state,
        city: { ...city, xp: newXp, level: newLevel },
        resources: {
          ...resources,
          money: resources.money + revenue,
          energy: Math.max(0, resources.energy + net.energy - consumption.energy),
          water: Math.max(0, resources.water + net.water - consumption.water),
          food: Math.max(0, resources.food + net.food - consumption.food),
          pollution: Math.max(0, Math.min(100, resources.pollution + net.pollution)),
          population: pop,
          happiness: Math.max(0, Math.min(100, resources.happiness + (resources.pollution < 15 ? 1 : -1))),
        }
      };
    }

    case 'BUILD': {
      const newGrids = { ...state.city.grids };
      newGrids[state.city.activeRegion][action.index] = { ...action.b, uid: Date.now() };
      return {
        ...state,
        city: { ...state.city, grids: newGrids },
        resources: { ...state.resources, money: state.resources.money - action.b.cost },
      };
    }

    case 'SET_SPECIALIZATION': {
      return {
        ...state,
        city: {
          ...state.city,
          specializations: { ...state.city.specializations, [state.city.activeRegion]: action.specId }
        }
      };
    }

    case 'SET_REGION': return { ...state, city: { ...state.city, activeRegion: action.region } };
    case 'TOGGLE_PAUSE': return { ...state, gamePaused: !state.gamePaused };
    default: return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [inspectorIndex, setInspectorIndex] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => dispatch({ type: 'TICK' }), TICK_RATE);
    return () => clearInterval(timer);
  }, [state.gamePaused]);

  const currentRegion = REGIONS[state.city.activeRegion.toUpperCase()];
  const currentSpec = SPECIALIZATIONS[state.city.specializations[state.city.activeRegion].toUpperCase()] || SPECIALIZATIONS.NONE;

  return (
    <div className="min-h-screen bg-[#08080a] text-slate-300 font-sans p-6 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Stats */}
        <header className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {[
            { label: 'Credits', val: state.resources.money, icon: '💰', color: 'text-emerald-400' },
            { label: 'Pop', val: state.resources.population, icon: '👥', color: 'text-blue-400' },
            { label: 'Energy', val: state.resources.energy, icon: '⚡', color: 'text-yellow-400' },
            { label: 'Water', val: state.resources.water, icon: '💧', color: 'text-cyan-400' },
            { label: 'Food', val: state.resources.food, icon: '🥗', color: 'text-green-400' },
            { label: 'Eco', val: `${100 - state.resources.pollution}%`, icon: '🌿', color: 'text-pink-400' },
          ].map(stat => (
            <div key={stat.label} className="bg-[#111114] border border-white/5 p-4 rounded-2xl">
              <p className="text-[10px] font-black uppercase opacity-30 tracking-widest flex justify-between">
                {stat.label} <span>{stat.icon}</span>
              </p>
              <p className={`text-lg font-black ${stat.color}`}>{Math.floor(stat.val).toLocaleString()}</p>
            </div>
          ))}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Controls & Focus */}
          <aside className="space-y-6">
            <div className="bg-[#111114] rounded-3xl p-6 border border-white/5">
              <h2 className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-4 text-center">Admin Controls</h2>
              <div className="space-y-2">
                {Object.values(REGIONS).map(r => (
                  <button 
                    key={r.id}
                    onClick={() => dispatch({ type: 'SET_REGION', region: r.id })}
                    className={`w-full p-4 rounded-2xl flex items-center justify-between border transition-all ${state.city.activeRegion === r.id ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : 'bg-white/5 border-transparent opacity-40 hover:opacity-100'}`}
                  >
                    <span className="text-xl">{r.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">{r.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#111114] rounded-3xl p-6 border border-white/5">
              <h2 className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-4 text-center">District Specialization</h2>
              <div className="grid grid-cols-1 gap-2">
                {Object.values(SPECIALIZATIONS).map(spec => (
                  <button 
                    key={spec.id}
                    onClick={() => dispatch({ type: 'SET_SPECIALIZATION', specId: spec.id })}
                    className={`p-3 rounded-xl text-left border transition-all ${currentSpec.id === spec.id ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-white/5 border-transparent opacity-40 hover:opacity-80'}`}
                  >
                    <p className="text-[10px] font-black uppercase text-white">{spec.name}</p>
                    <p className="text-[9px] opacity-60 leading-tight">{spec.buff}</p>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid View */}
          <main className="lg:col-span-3">
            <div className="bg-[#111114] rounded-[3rem] p-8 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 flex items-center gap-2 opacity-20">
                <span className="text-[10px] font-black uppercase tracking-widest">{currentRegion.name}</span>
                <span className="text-2xl">{currentRegion.icon}</span>
              </div>
              
              <div className="mb-8">
                <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Grid System <span className="text-blue-500">v14</span></h1>
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Active Focus: {currentSpec.name}</p>
              </div>

              <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                {state.city.grids[state.city.activeRegion].map((b, i) => (
                  <button 
                    key={i}
                    onClick={() => setInspectorIndex(i)}
                    className={`aspect-square rounded-[2rem] border-2 transition-all flex flex-col items-center justify-center gap-2 ${b ? 'bg-[#18181c] border-white/10 hover:border-blue-500' : 'bg-white/[0.02] border-dashed border-white/5 hover:bg-white/5'}`}
                  >
                    {b ? (
                      <>
                        <span className="text-4xl drop-shadow-lg">{b.icon}</span>
                        <span className="text-[8px] font-black uppercase opacity-40">{b.name}</span>
                      </>
                    ) : (
                      <span className="text-xl opacity-20">+</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Building Inspector Modal */}
      {inspectorIndex !== null && (
        <div className="fixed inset-0 z-50 bg-[#08080a]/90 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="bg-[#111114] w-full max-w-5xl rounded-[4rem] p-12 border border-white/10 shadow-2xl relative animate-in zoom-in-95">
            <button onClick={() => setInspectorIndex(null)} className="absolute top-10 right-10 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition-all">✕</button>
            
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Fabrication Matrix</h2>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-2">Slot {inspectorIndex + 1} // {currentRegion.name}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {Object.values(BUILDING_DATA).filter(b => b.region.includes(state.city.activeRegion)).map(b => {
                const canAfford = state.resources.money >= b.cost;
                return (
                  <button 
                    key={b.id}
                    disabled={!canAfford}
                    onClick={() => { dispatch({ type: 'BUILD', index: inspectorIndex, b }); setInspectorIndex(null); }}
                    className={`group relative overflow-hidden bg-[#18181c] border border-white/5 p-6 rounded-[2.5rem] flex flex-col items-center transition-all ${canAfford ? 'hover:scale-105 hover:border-blue-500' : 'opacity-20 cursor-not-allowed'}`}
                  >
                    <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">{b.icon}</span>
                    <p className="text-[11px] font-black uppercase text-white tracking-tighter">{b.name}</p>
                    <p className="text-[12px] font-black text-emerald-400 mt-1">${b.cost.toLocaleString()}</p>
                    
                    {/* Tooltip-style yield data */}
                    <div className="mt-4 pt-4 border-t border-white/5 w-full grid grid-cols-2 gap-y-1 text-[9px] font-bold opacity-60">
                      <div className={b.energy > 0 ? 'text-yellow-400' : ''}>⚡ {b.energy || 0}</div>
                      <div className={b.water > 0 ? 'text-cyan-400' : ''}>💧 {b.water || 0}</div>
                      <div className={b.pollution < 0 ? 'text-green-400' : 'text-red-400'}>☣️ {b.pollution || 0}</div>
                      <div className="text-blue-400">👥 {b.jobs || 0}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes zoom-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-in { animation: 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .zoom-in-95 { animation-name: zoom-in; }
      `}</style>
    </div>
  );
}