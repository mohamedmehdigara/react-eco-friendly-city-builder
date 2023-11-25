// App.js
import React, { useState } from 'react';
import City from './components/City';
import ResourcePanel from './components/ResourcePanel';
import PollutionMeter from './components/PollutionMeter';
import EcoActions from './components/EcoActions';
import GameOver from './components/GameOver';
import { render } from 'react-dom';

const App = () => {
  const initialResources = {
    money: 10000,
    energy: 100,
  };

  const [resources, setResources] = useState(initialResources);
  const [pollutionLevel, setPollutionLevel] = useState(0);
  const [isGameOver, setGameOver] = useState(false);

  const ACTION_COST = 500;
  const POLLUTION_INCREASE = 10;

  const handleEcoAction = (actionType) => {
    if (resources.money >= ACTION_COST) {
      setResources((prevResources) => ({
        ...prevResources,
        money: prevResources.money - ACTION_COST,
      }));

      setPollutionLevel((prevLevel) => prevLevel + POLLUTION_INCREASE);
    }
  };

  const handleGameOver = () => {
    if (pollutionLevel >= 50) {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setResources(initialResources);
    setPollutionLevel(0);
    setGameOver(false);
  };

  const containerStyle = {
    textAlign: 'center',
    maxWidth: '800px',
    margin: 'auto',
  };

  return (
    <div style={containerStyle}>
      <h1>Eco-Friendly City Builder</h1>
      <ResourcePanel resources={resources} />
      <PollutionMeter pollutionLevel={pollutionLevel} />
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

// Render your App component using ReactDOM
render(<App />, document.getElementById('root'));

export default App;
