// App.js
import React, { useState, useEffect } from 'react';
import City from './components/City';
import ResourcePanel from './components/ResourcePanel';
import PollutionMeter from './components/PollutionMeter';
import EcoActions from './components/EcoActions';
import GameOver from './components/GameOver';
import TechnologyTree from './components/TechnologyTree';
import EducationCenter from './components/EducationCenter'; // Import the EducationCenter component
import CityExpansion from './components/CityExpansion';
import Leaderboard from './components/Leaderboard';
import HelpPage from './components/HelpPage';
import WeatherDisplay from './components/WeatherDisplay';
import SettingsPage from './components/SettingsPage';
import CityMap from './components/CityMap';
import AchievementsDisplay from './components/AchievementsDisplay';
import NotificationCenter from './components/NotificationCenter';
import ResourceManager from './components/ResourceManager';
import ConstructionPanel from './components/ConstructionPanel';
import EcoScoreDisplay from './components/EcoScoreDisplay';

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
  const [educationCenterUpgrades, setEducationCenterUpgrades] = useState({
    courses: [
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

  const courses = []; // Define your courses array
  const workshops = []; // Define your workshops array
  const researchProjects = []; // Define your researchProjects array

  const ACTION_COST = 500;
  const POLLUTION_INCREASE = 10;
  const [showHelp, setShowHelp] = useState(false);
  const [currentView, setCurrentView] = useState('city');
   const cityStructure = [
    { id: 1, name: 'Residential-1', area: 'a' },
    { id: 2, name: 'Industrial', area: 'b' },
    { id: 3, name: 'Commercial', area: 'c' },
    { id: 4, name: 'Park', area: 'd' },
    { id: 5, name: 'Residential-2', area: 'e' },
  ];

  const [achievements, setAchievements] = useState([
    { id: 1, title: 'First Steps', description: 'Build your first residential zone.', isUnlocked: true },
    { id: 2, title: 'Green Power', description: 'Generate 50 energy from renewable sources.', isUnlocked: false, progress: 75 },
    { id: 3, title: 'Clean Air Initiative', description: 'Reduce pollution level to 10.', isUnlocked: false, progress: 30 },
    { id: 4, title: 'City Planner', description: 'Expand your city to zone level 3.', isUnlocked: true },
    { id: 5, title: 'Recycling Master', description: 'Recycle 500 units of waste.', isUnlocked: false, progress: 15 },
  ]);


 const [notifications, setNotifications] = useState([
    { id: 1, message: 'Welcome to Eco-topia!', type: 'success', timestamp: Date.now() - 10000, icon: '🎉' },
    { id: 2, message: 'Low energy levels detected.', type: 'warning', timestamp: Date.now() - 5000, icon: '⚠️' },
    { id: 3, message: 'Residential zone built successfully.', type: 'info', timestamp: Date.now(), icon: '🏠' },
  ]);

    const [showResourceDetails, setShowResourceDetails] = useState(null); // State for showing resource details

  const [availableBuildings, setAvailableBuildings] = useState([
    { id: 1, name: 'Solar Panel', cost: 200 },
    { id: 2, name: 'Wind Turbine', cost: 350 },
    { id: 3, name: 'Residential Zone', cost: 150 },
  ]);

  const [ecoScoreData, setEcoScoreData] = useState({
    pollutionReduction: { label: 'Pollution Reduced', value: 65, weight: 0.4 },
    renewableEnergy: { label: 'Renewable Energy', value: 80, weight: 0.3 },
    biodiversity: { label: 'Biodiversity Level', value: 70, weight: 0.3 },
    wasteRecycling: { label: 'Waste Recycled', value: 90, weight: 0.2 },
  });

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
    setCurrentView('city'); // Reset the current view to city
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
    // Modify your upgrade function to handle the undefined case
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

    const [weather, setWeather] = useState(generateRandomWeather()); // Initialize weather with a random value


  const handleRandomWeatherEvent = () => {
    const newWeather = generateRandomWeather();
    setWeather(newWeather);
  };

  const handleToggleHelp = () => {
    setShowHelp(!showHelp);
  };

  const cityName = 'Eco-topia';

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  useEffect(() => {
    if (/* condition to unlock Green Power */ true) {
      setAchievements(prev => prev.map(ach =>
        ach.id === 2 ? { ...ach, isUnlocked: true, progress: 100 } : ach
      ));
    }
    // ... more logic to update achievements based on game state
  }, []);

  useEffect(() => {
    // Example: Adding a new notification after a delay
    const newNotificationTimeout = setTimeout(() => {
      setNotifications(prev => [
        ...prev,
        { id: Date.now(), message: 'Pollution levels slightly increased.', type: 'warning', timestamp: Date.now(), icon: '🏭' },
      ]);
    }, 15000);

    return () => clearTimeout(newNotificationTimeout);
  }, []);

  const handleResourceDetails = (resourceName) => {
    console.log(`Showing details for ${resourceName}`);
    setShowResourceDetails(resourceName); // Set the state to show details
  };

  // Add this function:
  const renderResourceDetails = () => {
    if (!showResourceDetails) return null;

    switch (showResourceDetails) {
      case 'money':
        return (
          <div style={{  }}>
            <h3>Money Details</h3>
            <p>Current balance: ${resources.money}</p>
            <p>Income sources: ...</p>
            <p>Expenses: ...</p>
            <button onClick={() => setShowResourceDetails(null)}>Close</button>
          </div>
        );
      case 'energy':
        return (
          <div style={{  }}>
            <h3>Energy Details</h3>
            <p>Current energy level: {resources.energy} MW</p>
            <p>Production sources: ...</p>
            <p>Consumption: ...</p>
             <button onClick={() => setShowResourceDetails(null)}>Close</button>
          </div>
        );
      case 'pollution':
          return(
            <div style={{}}>
              <h3>Pollution Details</h3>
              <p>Pollution level: {resources.pollutionLevel}</p>
              <p>Pollution Sources: ... </p>
              <p> Effects: ...</p>
              <button onClick={() => setShowResourceDetails(null)}>Close</button>
            </div>
          );
      default:
        return null;
    }
  };

   const handleConstruct = (building) => {
    if (resources.money >= building.cost) {
      console.log(`Constructing: ${building.name}`);
      setResources((prevResources) => ({
        ...prevResources,
        money: prevResources.money - building.cost,
      }));
      // Implement logic to actually place the building in the city
    } else {
      console.log(`Insufficient funds to build ${building.name}`);
      // Optionally display a notification to the player
    }
  };

  useEffect(() => {
    // Example: Updating pollution reduction over time
    const interval = setInterval(() => {
      setEcoScoreData((prevData) => ({
        ...prevData,
        pollutionReduction: {
          ...prevData.pollutionReduction,
          value: Math.min(100, prevData.pollutionReduction.value + 1),
        },
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);



  return (
    <ErrorBoundary>
      <div style={containerStyle}>
        <h1>Eco-Friendly City Builder</h1>
        <nav>
          <button onClick={() => handleNavigate('city')}>City</button>
          <button onClick={() => handleNavigate('resources')}>Resources</button>
          <button onClick={() => handleNavigate('pollution')}>Pollution</button>
          <button onClick={() => handleNavigate('ecoActions')}>Eco Actions</button>
          <button onClick={() => handleNavigate('technology')}>Technology</button>
          <button onClick={() => handleNavigate('education')}>Education</button>
          <button onClick={() => handleNavigate('expansion')}>Expansion</button>
          <button onClick={() => handleNavigate('leaderboard')}>Leaderboard</button>
          <button onClick={() => handleNavigate('help')}>Help</button>
          <button onClick={() => handleNavigate('weather')}>Weather</button>
          <button onClick={() => handleNavigate('settings')}>Settings</button>
          <button onClick={() => handleNavigate('achievements')}>Your Achievements</button>

          
      
        </nav>

        <h1>Your City</h1>
      <NotificationCenter notifications={notifications} />
       <h1>City Construction</h1>
      <ConstructionPanel
        availableBuildings={availableBuildings}
        onConstructBuilding={handleConstruct}
        resources={resources}
      />

       <h1>City Health</h1>
      <EcoScoreDisplay ecoScoreData={ecoScoreData} />

       {currentView === 'resources' && (
          <>
            <ResourcePanel resources={resources} />
            <ResourceManager resources={resources} onResourceDetails={handleResourceDetails} />
            {renderResourceDetails()}
          </>
        )}

        {currentView === 'city' && (
          <City
            onGameOver={handleGameOver}
            resources={resources}
            setResources={setResources}
            setPollutionLevel={setPollutionLevel}
            hasEducationCenter={hasEducationCenter}
            onBuildEducationCenter={handleBuildEducationCenter}
          />
        )}
        <AchievementsDisplay achievements={achievements} />
        {currentView === 'resources' && <ResourcePanel resources={resources} />}
        {currentView === 'pollution' && <PollutionMeter pollutionLevel={pollutionLevel} />}
        {currentView === 'ecoActions' && <EcoActions onEcoAction={handleEcoAction} onBuildEducationCenter={handleBuildEducationCenter} />}
        {currentView === 'technology' && <TechnologyTree technologies={technologies} onResearch={handleResearch} />}
        {currentView === 'education' && (
          <EducationCenter
            onBuildEducationCenter={handleBuildEducationCenter}
            onUpgrade={handleUpgrade}
            onResearch={handleResearch}
            courses={educationCenterUpgrades.courses}
            workshops={educationCenterUpgrades.workshops}
            researchProjects={educationCenterUpgrades.researchProjects}
          />
        )}
        {currentView === 'expansion' && <CityExpansion currentCityZone={currentCityZone} onCityExpansion={handleCityExpansion} />}
        {currentView === 'leaderboard' && <Leaderboard scores={scores} />}
        {currentView === 'help' && <HelpPage />}
        {currentView === 'weather' && <WeatherDisplay city={cityName} />}
        {currentView === 'settings' && <SettingsPage />}

        {isGameOver && <GameOver score={resources.money} onRestart={handleRestart} />}
                <CityMap cityZones={cityStructure} />

      </div>
    </ErrorBoundary>
  );
}

export default App;