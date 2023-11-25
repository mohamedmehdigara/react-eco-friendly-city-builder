// App.js
import React, { useState, useEffect } from 'react';
import City from './components/City';
import ResourcePanel from './components/ResourcePanel';
import PollutionMeter from './components/PollutionMeter';
import EcoActions from './components/EcoActions';
import GameOver from './components/GameOver';
import Challenges from './components/Challenges';
import { render } from 'react-dom';

const App = () => {
  const [resources, setResources] = useState({
    money: 10000,
    energy: 100,
    // Add more resources as needed
  });

  const [pollutionLevel, setPollutionLevel] = useState(0);
  const [isGameOver, setGameOver] = useState(false);
  const [buildings, setBuildings] = useState([]); // Define buildings state
  const [challenges, setChallenges] = useState([]);

  const ACTION_COST = 500;
  const POLLUTION_INCREASE = 10;

  useEffect(() => {
    // Check for completed challenges
    checkChallenges();
  }, [resources, pollutionLevel, buildings]); // Add buildings to the dependency array

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
    setBuildings([]); // Reset buildings state
  };

  const containerStyle = {
    textAlign: 'center',
    maxWidth: '800px',
    margin: 'auto',
  };

  const checkChallenges = () => {
    // Implement logic to check and update challenges based on player progress
    const newChallenges = [
      { id: 1, description: 'Reach a pollution level below 20', completed: pollutionLevel < 20 },
      { id: 2, description: 'Build 5 residential buildings', completed: buildings.filter((b) => b.type === 'residential').length >= 5 },
    ];

    setChallenges(newChallenges);
  };

  return (
    <div style={containerStyle}>
      <h1>Eco-Friendly City Builder</h1>
      <ResourcePanel resources={resources} />
      <PollutionMeter pollutionLevel={pollutionLevel} />
      <Challenges challenges={challenges} />
      {!isGameOver ? (
        <>
          <City onGameOver={handleGameOver} setBuildings={setBuildings} /> {/* Pass setBuildings to City component */}
          <EcoActions onEcoAction={handleEcoAction} />
        </>
      ) : (
        <GameOver score={resources.money} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
