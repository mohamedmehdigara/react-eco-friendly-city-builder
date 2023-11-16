import React, { useState } from 'react';
import City from './components/City';
import ResourcePanel from './components/ResourcePanel';
import PollutionMeter from './components/PollutionMeter';
import EcoActions from './components/EcoActions';
import GameOver from './components/GameOver';

function App() {
  const [resources, setResources] = useState({
    money: 10000,
    energy: 100,
    // Add more resources as needed
  });

  const [pollutionLevel, setPollutionLevel] = useState(0);
  const [isGameOver, setGameOver] = useState(false);

  const handleEcoAction = (actionType) => {
    // Implement logic to handle eco-friendly actions and update resources/pollution
    // For simplicity, let's assume each action consumes money and affects pollution
    const actionCost = 500; // Adjust cost as needed
    const pollutionIncrease = 10; // Adjust pollution increase as needed

    if (resources.money >= actionCost) {
      setResources((prevResources) => ({
        ...prevResources,
        money: prevResources.money - actionCost,
      }));

      setPollutionLevel((prevLevel) => prevLevel + pollutionIncrease);
    }
  };

  const handleGameOver = () => {
    // Implement logic to determine game over conditions
    // For simplicity, let's assume the game ends when pollution reaches a certain level
    if (pollutionLevel >= 50) {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    // Implement logic to restart the game
    setResources({
      money: 10000,
      energy: 100,
    });

    setPollutionLevel(0);
    setGameOver(false);
  };

  return (
    <div>
      <h1>Eco-Friendly City Builder</h1>
      <ResourcePanel resources={resources} />
      <PollutionMeter pollutionLevel={pollutionLevel} />
      {!isGameOver ? (
        <div>
          <City onGameOver={handleGameOver} />
          <EcoActions onEcoAction={handleEcoAction} />
        </div>
      ) : (
        <GameOver score={resources.money} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
