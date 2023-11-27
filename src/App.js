// App.js
import React, { useState } from 'react';
import City from './components/City';
import ResourcePanel from './components/ResourcePanel';
import PollutionMeter from './components/PollutionMeter';
import EcoActions from './components/EcoActions';
import GameOver from './components/GameOver';
import EducationCenter from './components/EducationCenter'; // Import the EducationCenter component
import { render } from 'react-dom';

function App() {
  const [resources, setResources] = useState({
    money: 10000,
    energy: 100,
  });

  const [pollutionLevel, setPollutionLevel] = useState(0);
  const [isGameOver, setGameOver] = useState(false);
  const [hasEducationCenter, setHasEducationCenter] = useState(false); // Track the presence of the Education Center

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
    setResources({
      money: 10000,
      energy: 100,
    });

    setPollutionLevel(0);
    setGameOver(false);
  };

  const buildEducationCenter = () => {
    setHasEducationCenter(true);
    // Add logic for any bonuses or effects on eco-friendliness or resource production
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
            <City
              resources={resources}
              setResources={setResources}
              setPollutionLevel={setPollutionLevel}
              hasEducationCenter={hasEducationCenter} // Pass the Education Center state to the City component
            />
            <EcoActions onEcoAction={handleEcoAction} />
            {!hasEducationCenter && <EducationCenter onBuildEducationCenter={buildEducationCenter} />} 
            {/* Render EducationCenter only if it has not been built */}
          </>
        ) : (
          <GameOver score={resources.money} onRestart={handleRestart} />
        )}
      </div>
  );
}

export default App;
