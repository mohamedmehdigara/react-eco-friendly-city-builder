import React, { useState } from 'react';
import City from './components/City';
import ResourcePanel from './components/ResourcePanel';
import PollutionMeter from './components/PollutionMeter';
import EcoActions from './components/EcoActions';
import GameOver from './components/GameOver';

const App = () => {
  const [resources, setResources] = useState({ money: 10000, energy: 100 });
  const [pollutionLevel, setPollutionLevel] = useState(0);
  const [isGameOver, setGameOver] = useState(false);

  const handleEcoAction = (actionType) => {
    const ACTION_COST = 500;
    const POLLUTION_INCREASE = 10;

    if (resources.money >= ACTION_COST) {
      setResources((prevResources) => ({ ...prevResources, money: prevResources.money - ACTION_COST }));
      setPollutionLevel((prevLevel) => prevLevel + POLLUTION_INCREASE);
    }
  };

  const handleGameOver = () => setGameOver(pollutionLevel >= 50);

  const handleRestart = () => {
    setResources({ money: 10000, energy: 100 });
    setPollutionLevel(0);
    setGameOver(false);
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: '800px', margin: 'auto' }}>
      <h1>Eco-Friendly City Builder</h1>
      <ResourcePanel resources={resources} />
      <PollutionMeter />
      {!isGameOver ? (
        <>
          <City onGameOver={handleGameOver} />
          <EcoActions onEcoAction={handleEcoAction} />
        </>
      ) : (
        <GameOver score={resources.money} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default App;
