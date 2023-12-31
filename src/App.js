// App.js
import React, { useState } from 'react';
import City from './components/City';
import ResourcePanel from './components/ResourcePanel';
import PollutionMeter from './components/PollutionMeter';
import EcoActions from './components/EcoActions';
import GameOver from './components/GameOver';
import TechnologyTree from './components/TechnologyTree';
import EducationCenter from './components/EducationCenter'; // Import the EducationCenter component
import CityExpansion from './components/CityExpansion';
import Leaderboard from './components/Leaderboard';

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
  const [educationCenterUpgrades, setEducationCenterUpgrades] = useState({courses: [
    { id: 1, name: 'Advanced Environmental Science', level: 1 },
    // Add more courses as needed
  ],
  workshops: [
    { id: 1, name: 'Sustainable Architecture Workshop', level: 1 },
    // Add more workshops as needed
  ],
  researchProjects: [
    { id: 1, name: 'Renewable Energy Innovation', level: 1 },
    // Add more research projects as needed
  ],
});

  const [technologies, setTechnologies] = useState({
    cleanerEnergy: false,
    advancedWasteManagement: false,
    innovativeTransportation: false,
  }); 

  const [currentCityZone, setCurrentCityZone] = useState(1);
  const [scores, setScores] = useState([
    { id: 1, name: 'Player 1', score: 5000 },
    { id: 2, name: 'Player 2', score: 4500 },
  ]);

  const [weather, setWeather] = useState('sunny'); // Add weather state
  const courses = []; // Define your courses array
  const workshops = []; // Define your workshops array
  const researchProjects = []; // Define your researchProjects array



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
    setHasEducationCenter((prevHasEducationCenter) => {
      const newHasEducationCenter = !prevHasEducationCenter;
      console.log('Education Center built. hasEducationCenter:', newHasEducationCenter);
      return newHasEducationCenter;
    });
  };

  const handleUpgrade = (type, itemId) => {
    // Modify your upgrade function to handle the undefined cas 
  // Get the appropriate array based on the type
  const targetArray = type === 'course' ? courses : type === 'workshop' ? workshops : researchProjects;

  // Check if the array is defined before using findIndex
  if (targetArray) {
    const index = targetArray.findIndex((item) => item.id === itemId);

    if (index !== -1) {
      // Implement your upgrade logic using the index
      // ...
    } else {
      console.error(`Item with id ${itemId} not found in the array`);
    }
  } else {
    console.error('Target array is undefined');
  }


    setEducationCenterUpgrades((prevUpgrades) => {
      const updatedUpgrades = { ...prevUpgrades };
      const upgradeType = updatedUpgrades[type];
      const index = upgradeType.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        upgradeType[index].level += 1;
      }
      return updatedUpgrades;
    });
  };

  const handleResearch = (technology, itemId) => {
    // Implement logic to research a technology
    // Deduct research points, unlock technology, or perform other actions
    const researchCost = getResearchCost(technology);

    if (resources.researchPoints >= researchCost) {
      setResources((prevResources) => ({
        ...prevResources,
        researchPoints: prevResources.researchPoints - researchCost,
      }));

      setTechnologies((prevTechnologies) => ({
        ...prevTechnologies,
        [technology]: true,
      }));

      setEducationCenterUpgrades((prevUpgrades) => {
        const updatedUpgrades = { ...prevUpgrades };
        const researchIndex = updatedUpgrades.researchProjects.findIndex((project) => project.id === itemId);
        if (researchIndex !== -1) {
          // Implement logic to handle research completion and unlock new technologies
          // For example, update the city's available technologies state
          // setAvailableTechnologies((prevTechnologies) => [...prevTechnologies, newTechnology]);
          // You can also update resources or other game mechanics
        }
        return updatedUpgrades;
      
      });
    }
  };

  const getResearchCost = (technology) => {
    // You can implement a function to determine the research cost based on game balance
    // For simplicity, let's assume a constant cost for each technology
    return 100; // Adjust this value based on your game design
  };

  const handleCityExpansion = () => {
    // ... logic for city expansion
    setCurrentCityZone((prevCityZone) => prevCityZone + 1);

  };

  const updateScores = (playerId, newScore) => {
    setScores((prevScores) =>
      prevScores.map((score) => (score.id === playerId ? { ...score, score: newScore } : score))
    );
  };

  const containerStyle = {
    textAlign: 'center',
    maxWidth: '800px',
    margin: 'auto',
  };

  const generateRandomWeather = () => {
    const weatherOptions = ['Sunny', 'Cloudy', 'Rainy'];
    const randomIndex = Math.floor(Math.random() * weatherOptions.length);
    return weatherOptions[randomIndex];
  };

  const handleRandomWeatherEvent = () => {
    const newWeather = generateRandomWeather();
    setWeather(newWeather);
  };

  return (
    <ErrorBoundary>
      <div style={containerStyle}>
        <h1>Eco-Friendly City Builder</h1>
        <ResourcePanel resources={resources} />
        <PollutionMeter pollutionLevel={pollutionLevel} />
        {!isGameOver ? (
          <>
            <div>
              <City
                onGameOver={handleGameOver}
                resources={resources}
                setResources={setResources}
                setPollutionLevel={setPollutionLevel}
                hasEducationCenter={hasEducationCenter}
                onBuildEducationCenter={handleBuildEducationCenter}
              />
              <EcoActions onEcoAction={handleEcoAction} onBuildEducationCenter={handleBuildEducationCenter} />
              <TechnologyTree technologies={technologies} onResearch={handleResearch} /> {/* Render the TechnologyTree component */}
              <CityExpansion currentCityZone={currentCityZone} onCityExpansion={handleCityExpansion} />
            </div>
          </>
        ) : (
          <GameOver score={resources.money} onRestart={handleRestart} />
        )}
        <Leaderboard scores={scores} />
        <EducationCenter
          onBuildEducationCenter={handleBuildEducationCenter}
          onUpgrade={handleUpgrade}
          onResearch={handleResearch}
          courses={educationCenterUpgrades.courses}
          workshops={educationCenterUpgrades.workshops}
          researchProjects={educationCenterUpgrades.researchProjects}
        />
         <button onClick={handleRandomWeatherEvent}>Change Weather</button>
      </div>
    </ErrorBoundary>
  );
        }

export default App;