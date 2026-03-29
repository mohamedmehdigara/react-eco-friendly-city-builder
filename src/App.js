import React, { useReducer, useEffect, useState, useMemo } from 'react';

// --- Constants ---
const TICK_RATE = 2000;
const MARKET_REFRESH_RATE = 10000;
const DAY_LENGTH = 30; 
const TERRAFORM_TARGET = 10000;
const DISASTER_CHANCE = 0.04;
const PETITION_CHANCE = 0.08;

const BUILDING_DATA = {
  SOLAR: { id: 'solar', name: 'Solar Array', icon: '☀️', cost: 1200, energy: 60, water: -5, pollution: -2, region: ['surface', 'orbit'] },
  HABITAT: { id: 'habitat', name: 'Eco-Habitat', icon: '🏘️', cost: 1600, energy: -25, water: -30, food: -15, pollution: 2, housing: 80, region: ['surface', 'subsurface'] },
  FARM: { id: 'farm', name: 'Vertical Farm', icon: '🥬', cost: 2400, energy: -40, water: -60, food: 120, pollution: -5, region: ['surface', 'subsurface'] },
  WELL: { id: 'well', name: 'Atmospheric Well', icon: '💧', cost: 2000, energy: -35, water: 180, pollution: -3, region: ['surface'] },
  LAB: { id: 'lab', name: 'Research Lab', icon: '🧪', cost: 8000, energy: -120, water: -30, xp: 350, region: ['surface', 'subsurface', 'orbit'] },
  SHIELD: { id: 'shield', name: 'Shield Gen', icon: '🛡️', cost: 15000, energy: -300, defense: 0.8, region: ['surface', 'subsurface', 'orbit'] },
  DRONE_HUB: { id: 'drone', name: 'Logistics Hub', icon: '🚁', cost: 18000, energy: -200, tradeBonus: 0.35, region: ['surface', 'orbit'] },
  SPACEPORT: { id: 'spaceport', name: 'Interstellar Port', icon: '🚀', cost: 35000, energy: -600, prestige: 35, region: ['orbit'] },
  STABILIZER: { id: 'stabilizer', name: 'Quantum Stabilizer', icon: '🌀', cost: 14000, energy: -150, glitchResistance: 0.6, region: ['surface', 'subsurface', 'orbit'] }
};

const EDICTS = [
  { id: 'green_tax', name: 'Green Tax', icon: '🍃', effect: 'Pollution -25%, Happiness -12', cost: 5000 },
  { id: 'overclock', name: 'Overclock Labs', icon: '⚡', effect: 'XP +60%, Energy -150', cost: 12000 },
  { id: 'martial_law', name: 'Martial Law', icon: '🎖️', effect: 'Stability Decay -50%, Happiness -40', cost: 20000 }
];

const DISASTERS = {
  surface: { name: 'Acid Rain', icon: '🌧️', damage: 8, color: 'text-green-400' },
  subsurface: { name: 'Crustal Shake', icon: '🌋', damage: 12, color: 'text-orange-500' },
  orbit: { name: 'Solar Flare', icon: '💥', damage: 15, color: 'text-yellow-500' }
};

const PETITION_TEMPLATES = [
  { id: 'rationing', title: 'Food Rationing', text: 'Supplies are low. Should we enforce strict rationing?', options: [
    { label: 'Enforce (+Food, -Happiness)', effect: { food: 500, happiness: -15 } },
    { label: 'Subsidize (-Money, +Happiness)', effect: { money: -5000, happiness: 10 } }
  ]},
  { id: 'energy_leak', title: 'Power Grid Leak', text: 'A major leak is detected. Divert funds to fix it immediately?', options: [
    { label: 'Repair (-Money)', effect: { money: -8000 } },
    { label: 'Ignore (-Energy, +Pollution)', effect: { energy: -400, pollution: 10 } }
  ]},
  { id: 'migration', title: 'Orbital Refugees', text: 'A transport ship is requesting emergency docking.', options: [
    { label: 'Accept (+Pop, -Food)', effect: { population: 100, food: -300 } },
    { label: 'Refuse (-Prestige)', effect: { prestige: -10 } }
  ]}
];

const initialState = {
  city: { level: 1, xp: 0, activeRegion: 'surface', grids: { surface: Array(16).fill(null), subsurface: Array(16).fill(null), orbit: Array(16).fill(null) } },
  resources: { money: 120000, energy: 4000, water: 2500, food: 2500, pollution: 5, population: 250, happiness: 90, prestige: 0, terraformProgress: 0 },
  market: { energy: 15, water: 10, food: 20 },
  activeEdicts: [],
  glitches: [],
  activeDisaster: null,
  activePetition: null,
  gamePaused: false,
  tickCount: 0,
  logs: ["Metropolis Core Online. Monitoring neural link..."]
};

function gameReducer(state, action) {
  if (state.gamePaused && action.type !== 'TOGGLE_PAUSE' && action.type !== 'RESOLVE_PETITION') return state;

  switch (action.type) {
    case 'TICK': {
      const { resources, city, tickCount, activeEdicts, glitches, activeDisaster, activePetition } = state;
      const isNight = (tickCount % DAY_LENGTH) > (DAY_LENGTH / 2);
      let net = { energy: 0, water: 0, food: 0, pollution: 0, housing: 0, xp: 50, tradeBonus: 0, prestige: 0, glitchResistance: 0, defense: 0 };
      const newGrids = { ...city.grids };
      const newLogs = [...state.logs].slice(-5);

      // 1. Disaster/Petition Triggers
      let updatedDisaster = activeDisaster ? { ...activeDisaster, timer: activeDisaster.timer - 1 } : null;
      if (updatedDisaster && updatedDisaster.timer <= 0) updatedDisaster = null;

      let newPetition = activePetition;
      if (!updatedDisaster && !newPetition && Math.random() < DISASTER_CHANCE) {
        const region = ['surface', 'subsurface', 'orbit'][Math.floor(Math.random() * 3)];
        updatedDisaster = { region, timer: 6 };
        newLogs.push(`SYSTEM ALERT: ${DISASTERS[region].name} in ${region}!`);
      }

      if (!newPetition && Math.random() < PETITION_CHANCE) {
        newPetition = PETITION_TEMPLATES[Math.floor(Math.random() * PETITION_TEMPLATES.length)];
      }

      // 2. Grid Logic
      Object.keys(newGrids).forEach(rId => {
        const isDisasterHit = updatedDisaster?.region === rId;
        newGrids[rId] = newGrids[rId].map((b, idx) => {
          if (!b) return null;
          const isGlitched = glitches.some(g => g.region === rId && g.index === idx);
          if (isGlitched) { net.pollution += 2; return b; }

          let decay = (rId === 'subsurface' ? 0.7 : 0.4);
          if (activeEdicts.includes('martial_law')) decay *= 0.5;
          if (isDisasterHit) decay += DISASTERS[rId].damage;

          const newStability = Math.max(0, b.stability - (decay * (1 - net.defense/10)));
          if (newStability > 0) {
            let eff = 1.0;
            if (b.id === 'solar') eff = isNight && rId === 'surface' ? 0.1 : 1.4;
            if (rId === 'orbit') eff *= 1.5;
            
            net.energy += (b.energy || 0) * eff;
            net.water += (b.water || 0);
            net.food += (b.food || 0);
            net.pollution += (b.pollution || 0) * (activeEdicts.includes('green_tax') ? 0.75 : 1);
            net.housing += (b.housing || 0);
            net.xp += (b.xp || 0) * (activeEdicts.includes('overclock') ? 1.5 : 1);
            net.tradeBonus += (b.tradeBonus || 0);
            net.prestige += (b.prestige || 0);
            net.defense = Math.min(8, net.defense + (b.defense || 0));
          } else if (b.stability > 0) {
             newLogs.push(`CRITICAL: Structure lost in ${rId}.`);
          }
          return { ...b, stability: newStability };
        });
      });

      const pop = Math.floor(net.housing + 250);
      let revenue = (pop * 25 * (resources.happiness / 100)) * (1 + net.tradeBonus) + (net.prestige * 100);
      const terraformTick = resources.pollution < 15 ? 15 : resources.pollution > 40 ? -5 : 0;
      const happinessMod = (resources.pollution > 55 ? -1.5 : 0.4) + (activeEdicts.includes('martial_law') ? -2.0 : 0);

      return {
        ...state,
        tickCount: tickCount + 1,
        activeDisaster: updatedDisaster,
        activePetition: newPetition,
        logs: newLogs,
        city: { ...city, grids: newGrids, xp: city.xp + net.xp, level: Math.floor(city.xp / 12000) + 1 },
        resources: {
          ...resources,
          money: resources.money + Math.floor(revenue),
          energy: Math.max(0, resources.energy + net.energy - (pop * 0.3)),
          water: Math.max(0, resources.water + net.water - (pop * 0.3)),
          food: Math.max(0, resources.food + net.food - (pop * 0.25)),
          pollution: Math.max(0, Math.min(100, resources.pollution + (net.pollution / 40))),
          population: pop,
          prestige: resources.prestige + net.prestige,
          terraformProgress: Math.max(0, Math.min(TERRAFORM_TARGET, resources.terraformProgress + terraformTick)),
          happiness: Math.max(0, Math.min(100, resources.happiness + happinessMod)),
        }
      };
    }

    case 'MARKET_FLUX': {
        const flux = () => Math.floor(Math.random() * 15) + 5;
        return { ...state, market: { energy: flux(), water: flux(), food: flux() } };
    }

    case 'RESOLVE_PETITION': {
        const effect = action.option.effect;
        const res = { ...state.resources };
        Object.keys(effect).forEach(k => { res[k] += effect[k]; });
        return { ...state, activePetition: null, resources: res, logs: [...state.logs, `Overseer resolved ${state.activePetition.title}.`] };
    }

    case 'BUILD': {
        if (state.resources.money < action.b.cost) return state;
        const newGrids = { ...state.city.grids };
        newGrids[state.city.activeRegion][action.index] = { ...action.b, stability: 100 };
        return { ...state, city: { ...state.city, grids: newGrids }, resources: { ...state.resources, money: state.resources.money - action.b.cost } };
    }

    case 'TRADE': {
        const cost = state.market[action.res] * action.amount;
        if (action.amount > 0 && state.resources.money < cost) return state;
        if (action.amount < 0 && state.resources[action.res] < Math.abs(action.amount)) return state;
        return {
            ...state,
            resources: { 
                ...state.resources, 
                money: state.resources.money - cost,
                [action.res]: state.resources[action.res] + action.amount
            }
        };
    }

    case 'SET_REGION': return { ...state, city: { ...state.city, activeRegion: action.region } };
    case 'TOGGLE_PAUSE': return { ...state, gamePaused: !state.gamePaused };
    case 'TOGGLE_EDICT': {
        const exists = state.activeEdicts.includes(action.id);
        if (!exists && state.resources.money < action.cost) return state;
        return { ...state, activeEdicts: exists ? state.activeEdicts.filter(id => id !== action.id) : [...state.activeEdicts, action.id] };
    }
    default: return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [view, setView] = useState('city');
  const [buildIdx, setBuildIdx] = useState(null);

  useEffect(() => {
    const t = setInterval(() => dispatch({ type: 'TICK' }), TICK_RATE);
    const m = setInterval(() => dispatch({ type: 'MARKET_FLUX' }), MARKET_REFRESH_RATE);
    return () => { clearInterval(t); clearInterval(m); };
  }, [state.gamePaused]);

  const terraformPercent = (state.resources.terraformProgress / TERRAFORM_TARGET) * 100;

  return (
    <div className={`min-h-screen transition-colors duration-1000 bg-[#020617] text-slate-100 font-sans flex flex-col overflow-hidden`}>
      
      {/* HUD BAR */}
      <nav className="p-4 bg-black/60 border-b border-white/5 backdrop-blur-xl flex justify-between items-center z-[60]">
        <div className="flex gap-10 items-center">
            <h1 className="text-xl font-black italic tracking-tighter text-cyan-400">METRO-26 <span className="text-white/20 ml-2 text-[10px] not-italic font-bold">ALPHA</span></h1>
            <div className="flex gap-6 text-[9px] font-black uppercase tracking-[0.2em] opacity-50">
                {['city', 'council', 'trade'].map(v => (
                    <button key={v} onClick={() => setView(v)} className={`hover:text-cyan-400 ${view === v ? 'text-cyan-400 opacity-100' : ''}`}>{v}</button>
                ))}
            </div>
        </div>
        
        <div className="flex gap-4">
            <div className="bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                <p className="text-[10px] font-black text-cyan-400">${state.resources.money.toLocaleString()}</p>
            </div>
            <button onClick={() => dispatch({ type: 'TOGGLE_PAUSE' })} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs">{state.gamePaused ? '▶' : '||'}</button>
        </div>
      </nav>

      <main className="flex-1 p-6 relative overflow-hidden">
        {view === 'city' ? (
            <div className="grid grid-cols-12 gap-8 h-full max-w-[1600px] mx-auto">
                {/* STATUS PANEL */}
                <div className="col-span-3 space-y-4">
                    <div className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-6">Colony Resources</p>
                        <div className="space-y-6">
                            {[
                                { k: 'energy', i: '⚡', c: 'bg-yellow-400' },
                                { k: 'water', i: '💧', c: 'bg-blue-400' },
                                { k: 'food', i: '🥬', c: 'bg-green-400' },
                                { k: 'happiness', i: '😊', c: 'bg-pink-500' }
                            ].map(r => (
                                <div key={r.k}>
                                    <div className="flex justify-between text-[10px] font-black mb-1.5 uppercase">
                                        <span>{r.i} {r.k}</span>
                                        <span className={state.resources[r.k] < 100 ? 'text-red-500 animate-pulse' : ''}>{Math.floor(state.resources[r.k])}</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full"><div className={`h-full ${r.c} transition-all duration-1000`} style={{ width: `${Math.min(100, state.resources[r.k] / 50)}%` }} /></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8 h-[280px] flex flex-col">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-4">Neural Logs</p>
                        <div className="flex-1 space-y-2 overflow-hidden font-mono text-[9px] text-slate-500 uppercase tracking-tighter">
                            {state.logs.map((log, i) => <div key={i} className="animate-in slide-in-from-left"># {log}</div>)}
                        </div>
                    </div>
                </div>

                {/* GRID PANEL */}
                <div className="col-span-6 flex flex-col gap-6">
                    <div className="flex gap-2 justify-center">
                        {['surface', 'subsurface', 'orbit'].map(r => (
                            <button 
                                key={r} onClick={() => dispatch({ type: 'SET_REGION', region: r })}
                                className={`px-8 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border ${state.city.activeRegion === r ? 'bg-white text-black border-white' : 'border-white/5 opacity-30 hover:opacity-100'}`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    <div className="relative aspect-square bg-white/[0.02] border border-white/5 rounded-[4rem] p-10 shadow-2xl overflow-hidden">
                        {state.activeDisaster?.region === state.city.activeRegion && (
                            <div className="absolute inset-0 z-20 flex items-center justify-center bg-red-950/20 backdrop-blur-sm animate-in fade-in">
                                <div className="text-center p-8 border-2 border-red-500 rounded-[3rem] bg-black/80">
                                    <span className="text-6xl block animate-bounce">{DISASTERS[state.activeDisaster.region].icon}</span>
                                    <h2 className="text-2xl font-black uppercase tracking-tighter text-red-500 mt-4">{DISASTERS[state.activeDisaster.region].name} IN PROGRESS</h2>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-4 gap-4 h-full">
                            {state.city.grids[state.city.activeRegion].map((b, i) => (
                                <button 
                                    key={i} onClick={() => !b && setBuildIdx(i)}
                                    className={`rounded-3xl border transition-all flex flex-col items-center justify-center relative overflow-hidden group ${b ? 'bg-black/40 border-white/10' : 'bg-white/[0.02] border-dashed border-white/5 hover:border-white/20'}`}
                                >
                                    {b ? (
                                        <>
                                            <span className="text-4xl group-hover:scale-110 transition-transform">{b.icon}</span>
                                            <div className="absolute bottom-3 w-10 h-0.5 bg-white/5 rounded-full overflow-hidden">
                                                <div className={`h-full ${b.stability < 40 ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'}`} style={{ width: `${b.stability}%` }} />
                                            </div>
                                        </>
                                    ) : (
                                        <span className="opacity-0 group-hover:opacity-20 text-[8px] font-black uppercase">Assign</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* PROGRESS PANEL */}
                <div className="col-span-3 space-y-4">
                    <div className="bg-gradient-to-br from-cyan-900/40 to-indigo-950/40 border border-cyan-500/20 rounded-[2.5rem] p-8">
                        <p className="text-[10px] font-black uppercase text-cyan-400 mb-1">Terraforming Phase</p>
                        <h2 className="text-5xl font-black italic tracking-tighter mb-4">{Math.floor(terraformPercent)}%</h2>
                        <div className="h-2 bg-black/40 rounded-full overflow-hidden"><div className="h-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" style={{ width: `${terraformPercent}%` }} /></div>
                    </div>

                    <div className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-black uppercase opacity-40">City Level</span>
                            <span className="text-xl font-black">{state.city.level}</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-white/30" style={{ width: `${(state.city.xp % 12000) / 120}%` }} /></div>
                    </div>
                </div>
            </div>
        ) : view === 'council' ? (
            <div className="max-w-3xl mx-auto space-y-8 pt-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black uppercase italic">Executive Edicts</h2>
                    <p className="text-xs opacity-40 uppercase font-black mt-2">Overseer-Level Directives</p>
                </div>
                {EDICTS.map(e => {
                    const active = state.activeEdicts.includes(e.id);
                    return (
                        <div key={e.id} className={`p-8 rounded-[3rem] border transition-all flex items-center justify-between ${active ? 'bg-cyan-500 border-cyan-400 text-black' : 'bg-white/5 border-white/10 opacity-60'}`}>
                            <div className="flex items-center gap-6">
                                <span className="text-5xl">{e.icon}</span>
                                <div>
                                    <h3 className="text-xl font-black uppercase">{e.name}</h3>
                                    <p className="text-[10px] font-bold opacity-70 uppercase tracking-tighter">{e.effect}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => dispatch({ type: 'TOGGLE_EDICT', id: e.id, cost: e.cost })}
                                className={`px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${active ? 'bg-black text-white' : 'bg-white/10 hover:bg-white hover:text-black text-white'}`}
                            >
                                {active ? 'Rescind' : `Approve ($${e.cost/1000}k)`}
                            </button>
                        </div>
                    );
                })}
            </div>
        ) : (
            <div className="max-w-5xl mx-auto pt-10 grid grid-cols-3 gap-8">
                {['energy', 'water', 'food'].map(r => (
                    <div key={r} className="bg-white/[0.02] border border-white/5 p-12 rounded-[4rem] text-center">
                        <div className="text-6xl mb-6">{r === 'energy' ? '⚡' : r === 'water' ? '💧' : '🥬'}</div>
                        <p className="text-[10px] font-black uppercase opacity-40 mb-1">{r} Index</p>
                        <p className="text-5xl font-black mb-10 tracking-tighter text-cyan-400">${state.market[r]}</p>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => dispatch({ type: 'TRADE', res: r, amount: 100 })} className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 py-4 rounded-2xl font-black text-[10px] uppercase hover:bg-emerald-500 hover:text-black transition-all">Buy 100u</button>
                            <button onClick={() => dispatch({ type: 'TRADE', res: r, amount: -100 })} className="bg-red-500/20 text-red-400 border border-red-500/20 py-4 rounded-2xl font-black text-[10px] uppercase hover:bg-red-500 hover:text-black transition-all">Sell 100u</button>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </main>

      {/* OVERLAYS */}
      {state.activePetition && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in">
              <div className="bg-[#0f172a] border border-cyan-500/20 w-full max-w-xl rounded-[4rem] p-12 text-center shadow-2xl ring-1 ring-cyan-500/10">
                  <div className="text-5xl mb-6">📜</div>
                  <h2 className="text-3xl font-black uppercase italic tracking-tighter text-cyan-400">{state.activePetition.title}</h2>
                  <p className="mt-4 text-slate-400 font-medium leading-relaxed">{state.activePetition.text}</p>
                  <div className="grid gap-3 mt-10">
                      {state.activePetition.options.map((opt, i) => (
                          <button key={i} onClick={() => dispatch({ type: 'RESOLVE_PETITION', option: opt })} className="w-full bg-white/5 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black border border-white/5 transition-all">{opt.label}</button>
                      ))}
                  </div>
              </div>
          </div>
      )}

      {buildIdx !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl animate-in fade-in">
              <div className="bg-[#020617] border border-white/5 w-full max-w-3xl rounded-[4rem] p-12">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter">Construction</h2>
                    <button onClick={() => setBuildIdx(null)} className="text-xl opacity-30">✕</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-4 scrollbar-hide">
                      {Object.values(BUILDING_DATA).filter(b => b.region.includes(state.city.activeRegion)).map(b => (
                          <button 
                            key={b.id} disabled={state.resources.money < b.cost}
                            onClick={() => { dispatch({ type: 'BUILD', index: buildIdx, b }); setBuildIdx(null); }}
                            className="flex items-center gap-6 bg-white/[0.03] p-8 rounded-[3rem] border border-white/5 hover:border-cyan-500 group disabled:opacity-20 transition-all text-left"
                          >
                              <span className="text-5xl group-hover:scale-110 transition-transform">{b.icon}</span>
                              <div>
                                  <p className="text-lg font-black uppercase tracking-tighter">{b.name}</p>
                                  <p className="text-emerald-400 text-xs font-bold">${b.cost.toLocaleString()}</p>
                              </div>
                          </button>
                      ))}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}