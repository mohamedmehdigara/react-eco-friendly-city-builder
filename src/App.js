import React, { useReducer, useEffect, useState, useMemo } from 'react';

// --- Constants ---
const TICK_RATE = 2000;
const MARKET_REFRESH_RATE = 10000;
const DAY_LENGTH = 30; 
const TERRAFORM_TARGET = 10000;
const DISASTER_CHANCE = 0.04;
const BREAKTHROUGH_CHANCE = 0.02;
const PETITION_CHANCE = 0.08;

const BUILDING_DATA = {
  SOLAR: { id: 'solar', name: 'Solar Array', icon: '☀️', cost: 1200, energy: 65, water: -5, pollution: -2, region: ['surface', 'orbit'] },
  HABITAT: { id: 'habitat', name: 'Eco-Habitat', icon: '🏘️', cost: 1800, energy: -25, water: -30, food: -15, pollution: 1, housing: 85, region: ['surface', 'subsurface'] },
  FARM: { id: 'farm', name: 'Vertical Farm', icon: '🥬', cost: 2400, energy: -40, water: -60, food: 140, pollution: -5, region: ['surface', 'subsurface'] },
  WELL: { id: 'well', name: 'Atmospheric Well', icon: '💧', cost: 2000, energy: -35, water: 200, pollution: -3, region: ['surface'] },
  LAB: { id: 'lab', name: 'Research Lab', icon: '🧪', cost: 8000, energy: -120, water: -30, xp: 550, region: ['surface', 'subsurface', 'orbit'] },
  SHIELD: { id: 'shield', name: 'Shield Gen', icon: '🛡️', cost: 15000, energy: -300, defense: 0.8, region: ['surface', 'subsurface', 'orbit'] },
  DRONE_HUB: { id: 'drone', name: 'Logistics Hub', icon: '🚁', cost: 18000, energy: -200, tradeBonus: 0.4, region: ['surface', 'orbit'] },
  GAIA_SPIRE: { id: 'monument', name: 'Gaia Spire', icon: '🏛️', cost: 250000, energy: -1000, prestige: 500, region: ['surface'], isMonument: true }
};

const TECH_TREE = [
  { id: 'fusion', name: 'Cold Fusion', icon: '⚛️', cost: 15000, desc: '+25% Energy Production' },
  { id: 'hydro', name: 'Hydro-Recycling', icon: '♻️', cost: 12000, desc: '-20% Water Consumption' },
  { id: 'nano', name: 'Nano-Coatings', icon: '✨', cost: 20000, desc: 'Buildings lose 30% less stability' },
  { id: 'market_bot', name: 'Trading AI', icon: '🤖', cost: 18000, desc: '+20% Trade Revenue' },
  { id: 'bio_gen', name: 'Bio-Genetic Crops', icon: '🧬', cost: 25000, desc: '+40% Food Production' },
  { id: 'political_ai', name: 'Consensus Engine', icon: '📡', cost: 30000, desc: '+15% Happiness from all Petitions' }
];

const PETITIONS = [
  {
    id: 'tax_cut',
    title: 'Corporate Tax Rebate',
    body: 'The mining guilds demand a tax break to stimulate the local economy. It will cost us revenue but might boost trade.',
    options: [
      { text: 'Approve', effect: { money: -50000, happiness: -10, tradeBonus: 0.2 }, log: "Corporate tax cut enacted. Labor unions are furious." },
      { text: 'Deny', effect: { happiness: 15, tradeBonus: -0.05 }, log: "Petition denied. The guilds are grumbling but the people cheer." }
    ]
  },
  {
    id: 'rations',
    title: 'Emergency Rations',
    body: 'A supply ship was lost. Should we institute mandatory food rationing to preserve our stockpiles?',
    options: [
      { text: 'Rationing', effect: { food: 500, happiness: -20 }, log: "Strict rationing in effect. People are hungry but the silos are safe." },
      { text: 'Market Buy', effect: { money: -30000, food: 300, happiness: 10 }, log: "Bought surplus from the belt to avoid rationing." }
    ]
  },
  {
    id: 'eco_push',
    title: 'Gaia Initiative',
    body: 'Environmentalists want to shut down high-pollution sectors for a week to jumpstart terraforming.',
    options: [
      { text: 'Support', effect: { terraformProgress: 500, money: -25000, energy: -200 }, log: "Terraforming prioritized over industrial output." },
      { text: 'Ignore', effect: { pollution: 10, happiness: -5 }, log: "The Gaia Initiative was shelved. Smog levels rising." }
    ]
  }
];

const DISASTERS = {
  surface: { name: 'Acid Rain', icon: '🌧️', damage: 8 },
  subsurface: { name: 'Crustal Shake', icon: '🌋', damage: 12 },
  orbit: { name: 'Solar Flare', icon: '💥', damage: 15 }
};

const initialState = {
  city: { level: 1, xp: 0, activeRegion: 'surface', grids: { surface: Array(16).fill(null), subsurface: Array(16).fill(null), orbit: Array(16).fill(null) } },
  resources: { money: 150000, energy: 4000, water: 2500, food: 2500, pollution: 5, population: 250, happiness: 85, prestige: 0, terraformProgress: 0 },
  market: { energy: 15, water: 10, food: 20 },
  unlockedTechs: [],
  activeDisaster: null,
  activePetition: null,
  gamePaused: false,
  tickCount: 0,
  victory: false,
  logs: ["Metropolis Core Online. Terraforming initialization..."]
};

function gameReducer(state, action) {
  if (state.gamePaused && !['TOGGLE_PAUSE', 'RESOLVE_PETITION', 'UNLOCK_TECH', 'DISMISS_VICTORY'].includes(action.type)) return state;

  switch (action.type) {
    case 'TICK': {
      const { resources, city, tickCount, unlockedTechs, activeDisaster, activePetition } = state;
      const isNight = (tickCount % DAY_LENGTH) > (DAY_LENGTH / 2);
      let net = { energy: 0, water: 0, food: 0, pollution: 0, housing: 0, xp: 100, tradeBonus: 0, prestige: 0, stabilityMod: 1 };
      
      if (unlockedTechs.includes('nano')) net.stabilityMod = 0.7;

      const newGrids = { ...city.grids };
      const newLogs = [...state.logs].slice(-7);

      // Random Events
      let updatedDisaster = activeDisaster ? { ...activeDisaster, timer: activeDisaster.timer - 1 } : null;
      if (updatedDisaster && updatedDisaster.timer <= 0) updatedDisaster = null;

      if (!updatedDisaster && Math.random() < DISASTER_CHANCE) {
        const region = ['surface', 'subsurface', 'orbit'][Math.floor(Math.random() * 3)];
        updatedDisaster = { region, timer: 6 };
        newLogs.push(`SYSTEM ALERT: ${DISASTERS[region].name} in ${region.toUpperCase()}!`);
      }

      let updatedPetition = activePetition;
      if (!updatedPetition && Math.random() < PETITION_CHANCE) {
        updatedPetition = PETITIONS[Math.floor(Math.random() * PETITIONS.length)];
        newLogs.push("GOVERNANCE: A new petition awaits council review.");
      }

      if (Math.random() < BREAKTHROUGH_CHANCE) {
        newLogs.push("BREAKTHROUGH: Research efficiency peaked! +1500 XP.");
        city.xp += 1500;
      }

      // Grid Logic
      Object.keys(newGrids).forEach(rId => {
        const isDisasterHit = updatedDisaster?.region === rId;
        newGrids[rId] = newGrids[rId].map((b) => {
          if (!b) return null;
          let decay = (rId === 'subsurface' ? 0.7 : 0.4) * net.stabilityMod;
          if (isDisasterHit) decay += DISASTERS[rId].damage;

          const newStability = Math.max(0, b.stability - decay);
          if (newStability > 0) {
            let eff = 1.0;
            if (b.id === 'solar') {
                eff = isNight && rId === 'surface' ? 0.1 : 1.5;
                if (unlockedTechs.includes('fusion')) eff *= 1.25;
            }
            if (b.id === 'farm' && unlockedTechs.includes('bio_gen')) eff *= 1.4;
            if (rId === 'orbit') eff *= 1.6;
            
            net.energy += (b.energy || 0) * eff;
            net.water += (b.water || 0) * (unlockedTechs.includes('hydro') ? 0.8 : 1);
            net.food += (b.food || 0) * eff;
            net.pollution += (b.pollution || 0);
            net.housing += (b.housing || 0);
            net.xp += (b.xp || 0);
            net.tradeBonus += (b.tradeBonus || 0) + (unlockedTechs.includes('market_bot') ? 0.08 : 0);
            net.prestige += (b.prestige || 0);
          }
          return { ...b, stability: newStability };
        });
      });

      const pop = Math.floor(net.housing + 250);
      let revenue = (pop * 32 * (resources.happiness / 100)) * (1 + net.tradeBonus);
      const terraformTick = resources.pollution < 15 ? 25 : resources.pollution > 40 ? -10 : 0;

      return {
        ...state,
        tickCount: tickCount + 1,
        activeDisaster: updatedDisaster,
        activePetition: updatedPetition,
        logs: newLogs,
        city: { ...city, grids: newGrids, xp: city.xp + net.xp, level: Math.floor(city.xp / 20000) + 1 },
        resources: {
          ...resources,
          money: resources.money + Math.floor(revenue),
          energy: Math.max(0, resources.energy + net.energy - (pop * 0.4)),
          water: Math.max(0, resources.water + net.water - (pop * 0.4)),
          food: Math.max(0, resources.food + net.food - (pop * 0.35)),
          pollution: Math.max(0, Math.min(100, resources.pollution + (net.pollution / 40))),
          population: pop,
          prestige: resources.prestige + net.prestige,
          terraformProgress: Math.max(0, Math.min(TERRAFORM_TARGET, resources.terraformProgress + terraformTick)),
          happiness: Math.max(0, Math.min(100, resources.happiness + (resources.pollution > 45 ? -1.5 : 0.3))),
        }
      };
    }

    case 'RESOLVE_PETITION': {
        const { effect, log } = action.option;
        let bonusHappiness = state.unlockedTechs.includes('political_ai') ? 1.15 : 1;
        const newResources = { ...state.resources };
        Object.keys(effect).forEach(k => {
            if (k === 'happiness') newResources[k] += effect[k] * bonusHappiness;
            else newResources[k] += effect[k];
        });
        return {
            ...state,
            activePetition: null,
            logs: [...state.logs, log],
            resources: newResources
        };
    }

    case 'MARKET_FLUX': {
        const flux = () => Math.floor(Math.random() * 25) + 5;
        return { ...state, market: { energy: flux(), water: flux(), food: flux() } };
    }

    case 'UNLOCK_TECH': {
        if (state.city.xp < action.tech.cost || state.unlockedTechs.includes(action.tech.id)) return state;
        return { 
            ...state, 
            city: { ...state.city, xp: state.city.xp - action.tech.cost },
            unlockedTechs: [...state.unlockedTechs, action.tech.id],
            logs: [...state.logs, `RESEARCH: ${action.tech.name} operational.`]
        };
    }

    case 'BUILD': {
        if (state.resources.money < action.b.cost) return state;
        const newGrids = { ...state.city.grids };
        newGrids[state.city.activeRegion][action.index] = { ...action.b, stability: 100 };
        const isVictory = action.b.isMonument;
        return { 
            ...state, 
            victory: isVictory,
            city: { ...state.city, grids: newGrids }, 
            resources: { ...state.resources, money: state.resources.money - action.b.cost } 
        };
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
    case 'DISMISS_VICTORY': return { ...state, victory: false };
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
  
  const themeClass = terraformPercent > 85 ? 'bg-emerald-950 text-emerald-50' : terraformPercent > 45 ? 'bg-indigo-950 text-indigo-50' : 'bg-slate-950 text-slate-50';
  const accentColor = terraformPercent > 85 ? 'text-emerald-400' : terraformPercent > 45 ? 'text-indigo-400' : 'text-cyan-400';
  const barColor = terraformPercent > 85 ? 'bg-emerald-400' : terraformPercent > 45 ? 'bg-indigo-400' : 'bg-cyan-400';

  return (
    <div className={`min-h-screen transition-all duration-[4000ms] ${themeClass} font-sans flex flex-col overflow-hidden selection:bg-white/20`}>
      
      {/* HUD BAR */}
      <nav className="p-5 bg-black/40 border-b border-white/5 backdrop-blur-3xl flex justify-between items-center z-[80] shadow-2xl">
        <div className="flex gap-12 items-center">
            <h1 className={`text-2xl font-black italic tracking-tighter ${accentColor} drop-shadow-[0_0_10px_currentColor]`}>METRO-28</h1>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.25em] opacity-40">
                {['city', 'research', 'trade'].map(v => (
                    <button key={v} onClick={() => setView(v)} className={`hover:text-white transition-all hover:scale-110 ${view === v ? 'text-white opacity-100' : ''}`}>{v}</button>
                ))}
            </div>
        </div>
        
        <div className="flex gap-6 items-center">
            <div className="flex flex-col items-end">
                <p className="text-[9px] font-black opacity-30 uppercase tracking-widest">Global Reserves</p>
                <p className={`text-lg font-black ${accentColor}`}>${state.resources.money.toLocaleString()}</p>
            </div>
            <button onClick={() => dispatch({ type: 'TOGGLE_PAUSE' })} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-sm group">
                <span className="group-hover:scale-110 transition-transform">{state.gamePaused ? '▶' : '||'}</span>
            </button>
        </div>
      </nav>

      <main className="flex-1 p-8 relative overflow-hidden">
        {view === 'city' ? (
            <div className="grid grid-cols-12 gap-8 h-full max-w-[1700px] mx-auto animate-in fade-in slide-in-from-top-4 duration-700">
                {/* STATUS COLUMN */}
                <div className="col-span-3 space-y-6">
                    <div className="bg-black/30 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20">Vitals</p>
                            <span className="text-[10px] font-bold opacity-40">DAY {Math.floor(state.tickCount / DAY_LENGTH)}</span>
                        </div>
                        <div className="space-y-6">
                            {[
                                { k: 'energy', i: '⚡', c: 'bg-yellow-400', max: 6000 },
                                { k: 'water', i: '💧', c: 'bg-blue-400', max: 6000 },
                                { k: 'food', i: '🥬', c: 'bg-green-400', max: 6000 },
                                { k: 'happiness', i: '😊', c: 'bg-rose-400', max: 100 }
                            ].map(r => (
                                <div key={r.k}>
                                    <div className="flex justify-between text-[10px] font-black mb-2 uppercase tracking-tight">
                                        <span>{r.i} {r.k}</span>
                                        <span className={state.resources[r.k] < 300 && r.k !== 'happiness' ? 'text-red-500 animate-pulse' : ''}>
                                            {Math.floor(state.resources[r.k])}
                                        </span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full p-[1px]"><div className={`h-full ${r.c} transition-all duration-1000 shadow-[0_0_12px_currentColor] rounded-full`} style={{ width: `${Math.min(100, (state.resources[r.k] / r.max) * 100)}%` }} /></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-black/30 border border-white/5 rounded-[2.5rem] p-8 h-[320px] flex flex-col">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-20 mb-6 italic">Neural Logs</p>
                        <div className="flex-1 space-y-3 overflow-y-auto font-mono text-[9px] text-slate-400 uppercase leading-relaxed scrollbar-hide">
                            {state.logs.map((log, i) => <div key={i} className="animate-in slide-in-from-left-2 opacity-70 hover:opacity-100 transition-opacity">[{i}] {log}</div>)}
                        </div>
                    </div>
                </div>

                {/* WORLD COLUMN */}
                <div className="col-span-6 flex flex-col gap-6">
                    <div className="flex gap-2 justify-center bg-black/60 p-1.5 rounded-full border border-white/5 w-fit mx-auto shadow-xl">
                        {['surface', 'subsurface', 'orbit'].map(r => (
                            <button 
                                key={r} onClick={() => dispatch({ type: 'SET_REGION', region: r })}
                                className={`px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${state.city.activeRegion === r ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.2)] scale-105' : 'text-white/30 hover:text-white hover:bg-white/5'}`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    <div className="relative aspect-square bg-black/50 border border-white/10 rounded-[4rem] p-10 shadow-3xl overflow-hidden group">
                        {/* Disaster Overlay */}
                        {state.activeDisaster?.region === state.city.activeRegion && (
                            <div className="absolute inset-0 z-[70] flex items-center justify-center bg-red-950/60 backdrop-blur-md animate-in fade-in duration-500">
                                <div className="text-center p-12 border-2 border-red-500/50 rounded-[4rem] bg-black/95 shadow-2xl">
                                    <span className="text-7xl block mb-4 animate-bounce">{DISASTERS[state.activeDisaster.region].icon}</span>
                                    <h2 className="text-2xl font-black uppercase text-red-500 tracking-[0.3em]">Sector Emergency</h2>
                                    <p className="text-[10px] font-bold opacity-50 mt-2 uppercase">{DISASTERS[state.activeDisaster.region].name} in progress</p>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-4 gap-6 h-full">
                            {state.city.grids[state.city.activeRegion].map((b, i) => (
                                <button 
                                    key={i} onClick={() => !b && setBuildIdx(i)}
                                    className={`rounded-[2.5rem] border transition-all duration-500 flex flex-col items-center justify-center relative group overflow-hidden ${b ? 'bg-white/[0.04] border-white/10 shadow-lg' : 'bg-white/[0.01] border-dashed border-white/5 hover:border-white/30 hover:bg-white/[0.05]'}`}
                                >
                                    {b ? (
                                        <>
                                            <span className="text-5xl group-hover:scale-125 transition-transform duration-700">{b.icon}</span>
                                            <div className="absolute bottom-6 w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div className={`h-full transition-all duration-700 ${b.stability < 40 ? 'bg-red-500' : 'bg-cyan-400'}`} style={{ width: `${b.stability}%` }} />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                            <span className="text-3xl mb-1 font-thin">+</span>
                                            <span className="text-[8px] font-black uppercase tracking-widest">Install</span>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* INFO COLUMN */}
                <div className="col-span-3 space-y-6">
                    <div className={`p-10 rounded-[3rem] border border-white/10 backdrop-blur-3xl transition-all duration-[2000ms] relative overflow-hidden ${terraformPercent > 60 ? 'bg-emerald-500/10' : 'bg-white/5'}`}>
                        <div className="relative z-10 text-center">
                            <p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-30 mb-2">Gaia Progress</p>
                            <div className={`text-7xl font-black italic tracking-tighter mb-6 ${accentColor}`}>{Math.floor(terraformPercent)}%</div>
                            <div className="h-4 bg-black/50 rounded-full p-1 border border-white/5 overflow-hidden">
                                <div className={`h-full rounded-full transition-all duration-[3000ms] ${barColor} shadow-[0_0_30px_rgba(255,255,255,0.3)]`} style={{ width: `${terraformPercent}%` }} />
                            </div>
                        </div>
                        {/* Ambient Glow */}
                        <div className={`absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-20 ${barColor}`} />
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-20 mb-2">Research Data Bank</p>
                        <h3 className={`text-4xl font-black tracking-tighter ${accentColor} drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]`}>{Math.floor(state.city.xp).toLocaleString()}</h3>
                        <p className="text-[9px] font-bold opacity-40 mt-3 uppercase tracking-widest">Level {state.city.level} Command</p>
                    </div>
                </div>
            </div>
        ) : view === 'research' ? (
            <div className="max-w-4xl mx-auto pt-10 pb-32 h-full overflow-y-auto scrollbar-hide animate-in slide-in-from-bottom-8 duration-1000">
                <div className="flex justify-between items-end mb-16 px-4">
                    <div>
                        <h2 className="text-5xl font-black italic tracking-tighter uppercase">Nexus Research</h2>
                        <p className="text-xs font-bold opacity-30 mt-2 uppercase tracking-[0.3em]">Genetic & Mechanical Evolution</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black opacity-20 uppercase tracking-widest">Available XP</p>
                        <p className={`text-3xl font-black ${accentColor}`}>{state.city.xp.toLocaleString()}</p>
                    </div>
                </div>

                <div className="grid gap-6">
                    {TECH_TREE.map(tech => {
                        const unlocked = state.unlockedTechs.includes(tech.id);
                        const canAfford = state.city.xp >= tech.cost;
                        return (
                            <div key={tech.id} className={`p-10 rounded-[3rem] border transition-all duration-700 flex items-center justify-between group ${unlocked ? 'bg-white text-black border-white shadow-2xl scale-[1.02]' : 'bg-white/[0.03] border-white/5 hover:border-white/20'}`}>
                                <div className="flex items-center gap-10">
                                    <span className={`text-7xl transition-transform duration-700 group-hover:rotate-12 ${unlocked ? '' : 'grayscale opacity-30'}`}>{tech.icon}</span>
                                    <div>
                                        <h3 className="text-2xl font-black uppercase italic tracking-tighter">{tech.name}</h3>
                                        <p className="text-xs font-bold opacity-60 uppercase mt-2 tracking-wide">{tech.desc}</p>
                                    </div>
                                </div>
                                {!unlocked && (
                                    <button 
                                        onClick={() => dispatch({ type: 'UNLOCK_TECH', tech })}
                                        disabled={!canAfford}
                                        className={`px-12 py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all border ${canAfford ? 'border-white bg-white/10 hover:bg-white hover:text-black shadow-lg' : 'border-white/5 opacity-20'}`}
                                    >
                                        Extract ({tech.cost/1000}k XP)
                                    </button>
                                )}
                                {unlocked && <span className="text-[11px] font-black uppercase tracking-widest px-10 py-3 border border-black/20 rounded-full">Initialized</span>}
                            </div>
                        );
                    })}
                </div>
            </div>
        ) : (
            <div className="max-w-6xl mx-auto pt-16 grid grid-cols-3 gap-12 animate-in zoom-in-95 duration-700">
                {['energy', 'water', 'food'].map(r => (
                    <div key={r} className="bg-black/30 border border-white/10 p-16 rounded-[4rem] text-center hover:border-white/30 transition-all group relative overflow-hidden">
                        <div className="text-8xl mb-10 transition-transform group-hover:scale-110 duration-500 drop-shadow-2xl">{r === 'energy' ? '⚡' : r === 'water' ? '💧' : '🥬'}</div>
                        <p className="text-[11px] font-black uppercase opacity-20 mb-2 tracking-[0.4em]">{r} Index</p>
                        <p className={`text-6xl font-black mb-12 tracking-tighter ${accentColor}`}>${state.market[r]}</p>
                        <div className="flex flex-col gap-4">
                            <button onClick={() => dispatch({ type: 'TRADE', res: r, amount: 250 })} className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-widest hover:bg-emerald-400 hover:text-black transition-all">Import 250u</button>
                            <button onClick={() => dispatch({ type: 'TRADE', res: r, amount: -250 })} className="bg-rose-500/10 text-rose-400 border border-rose-500/20 py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-widest hover:bg-rose-400 hover:text-black transition-all">Export 250u</button>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </main>

      {/* OVERLAYS */}
      
      {/* Petition Modal */}
      {state.activePetition && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-8 bg-black/90 backdrop-blur-3xl animate-in fade-in duration-500">
              <div className="bg-slate-900 border-2 border-white/10 w-full max-w-3xl rounded-[4rem] p-16 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                  <div className="text-center mb-10">
                    <span className="text-5xl mb-6 block">⚖️</span>
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4 text-white">Council Petition</h2>
                    <h3 className={`text-xl font-bold uppercase ${accentColor} tracking-widest mb-6`}>{state.activePetition.title}</h3>
                    <p className="text-lg opacity-60 leading-relaxed font-medium">{state.activePetition.body}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                      {state.activePetition.options.map((opt, i) => (
                          <button 
                            key={i} onClick={() => dispatch({ type: 'RESOLVE_PETITION', option: opt })}
                            className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white hover:text-black hover:scale-105 transition-all group"
                          >
                              <p className="text-xl font-black uppercase italic mb-2 tracking-tighter">{opt.text}</p>
                              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest group-hover:opacity-100">Confirm Directive</p>
                          </button>
                      ))}
                  </div>
              </div>
          </div>
      )}

      {/* Build Menu */}
      {buildIdx !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/95 backdrop-blur-2xl animate-in zoom-in-95 duration-300">
              <div className="bg-slate-950 border border-white/10 w-full max-w-5xl rounded-[5rem] p-20 shadow-2xl relative overflow-hidden">
                  <div className="flex justify-between items-center mb-16">
                    <div>
                        <h2 className="text-5xl font-black uppercase italic tracking-tighter">Blueprint Registry</h2>
                        <p className="text-xs font-bold opacity-30 mt-2 uppercase tracking-[0.4em]">Authorized Sector: {state.city.activeRegion}</p>
                    </div>
                    <button onClick={() => setBuildIdx(null)} className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all text-xl">✕</button>
                  </div>
                  <div className="grid grid-cols-2 gap-8 max-h-[55vh] overflow-y-auto pr-6 scrollbar-hide">
                      {Object.values(BUILDING_DATA).filter(b => b.region.includes(state.city.activeRegion)).map(b => {
                          const isMonument = b.isMonument;
                          const monumentLocked = isMonument && terraformPercent < 90;
                          return (
                            <button 
                                key={b.id} disabled={state.resources.money < b.cost || monumentLocked}
                                onClick={() => { dispatch({ type: 'BUILD', index: buildIdx, b }); setBuildIdx(null); }}
                                className={`flex items-center gap-10 p-10 rounded-[3.5rem] border transition-all group relative overflow-hidden ${isMonument ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-white/[0.02] border-white/5 hover:border-white/40 hover:bg-white/5'} disabled:opacity-10`}
                            >
                                <span className="text-7xl group-hover:scale-110 transition-transform duration-500">{b.icon}</span>
                                <div className="flex-1 text-left">
                                    <p className="text-2xl font-black uppercase italic tracking-tighter">{b.name}</p>
                                    <div className="flex justify-between items-center mt-3">
                                        <p className={`${isMonument ? 'text-emerald-400' : 'text-cyan-400'} font-black text-sm tracking-widest`}>${b.cost.toLocaleString()}</p>
                                        {monumentLocked && <p className="text-[9px] font-bold text-rose-500 uppercase">90% Terra Required</p>}
                                    </div>
                                </div>
                            </button>
                          );
                      })}
                  </div>
              </div>
          </div>
      )}

      {/* Victory Modal */}
      {state.victory && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-10 animate-in fade-in duration-1000">
              <div className="text-center max-w-4xl">
                  <span className="text-9xl block mb-12 animate-pulse">🌱</span>
                  <h1 className="text-8xl font-black italic tracking-tighter uppercase mb-6 drop-shadow-[0_0_50px_rgba(52,211,153,0.5)]">The World Is Born</h1>
                  <p className="text-2xl font-light opacity-60 leading-relaxed mb-12 tracking-wide uppercase italic">The Gaia Spire stands tall. Earth is no longer a memory—it is here. You have triumphed over the stars.</p>
                  <button onClick={() => dispatch({ type: 'DISMISS_VICTORY' })} className="px-20 py-8 bg-emerald-500 text-black rounded-full font-black uppercase text-sm tracking-[0.5em] hover:bg-white hover:scale-110 transition-all shadow-2xl">Continue Legacy</button>
              </div>
          </div>
      )}
    </div>
  );
}