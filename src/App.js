// App.js
import React, { useState } from 'react';
import City from './components/City';
import ResourcePanel from './components/ResourcePanel';
import PollutionMeter from './components/PollutionMeter';
import EcoActions from './components/EcoActions';
import GameOver from './components/GameOver';
import EducationCenter from './components/EducationCenter'; // Import the EducationCenter component
import { render } from 'react-dom';

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  const componentDidCatch = (error, errorInfo) => {
    console.error('Error caught by error boundary:', error, errorInfo);
    setHasError(true);
  };

  if (hasError) {
    return (
      <>
        <h1>Something went wrong.</h1>
        <p>Please refresh the page or contact support.</p>
      </>
    );
  }

  return children;
}

function App() {
  const [resources, setResources] = useState({
    money: 10000,
    energy: 100,
    // Add more resources as needed
  });

  const [pollutionLevel, setPollutionLevel] = useState(0);
  const [isGameOver, setGameOver] = useState(false);
  const [hasEducationCenter, setHasEducationCenter] = useState(false); // Track if the Education Center has been built

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
    setHasEducationCenter(false); // Reset Education Center status
  };

  const handleBuildEducationCenter = () => {
    console.log('Building Education Center...');
    // Implement logic to build the Education Center
    // Adjust resources, setHasEducationCenter, or perform other actions
    setHasEducationCenter(true);
  };
  

  const containerStyle = {
    textAlign: 'center',
    maxWidth: '800px',
    margin: 'auto',
  };

  return (
    <ErrorBoundary>
      <div style={containerStyle}>
        <h1>Eco-Friendly City Builder</h1>
        <ResourcePanel resources={resources} />
        <PollutionMeter pollutionLevel={pollutionLevel} />
        {!isGameOver ? (
          <>
            <City
              onGameOver={handleGameOver}
              resources={resources}
              setResources={setResources}
              setPollutionLevel={setPollutionLevel}
              hasEducationCenter={hasEducationCenter}
            />
            <EcoActions onEcoAction={handleEcoAction} onBuildEducationCenter={handleBuildEducationCenter} />
          </>
        ) : (
          <GameOver score={resources.money} onRestart={handleRestart} />
        )}
        {hasEducationCenter && <EducationCenter />}
      </div>
    </ErrorBoundary>
  );
}

export default App;
