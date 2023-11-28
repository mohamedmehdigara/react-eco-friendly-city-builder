// City.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Building from './Building';
import EducationCenter from './EducationCenter';
import RandomEvent from './RandomEvent';
import { CityContainer } from '../styles';

const City = ({
  resources,
  setResources,
  setPollutionLevel,
  hasEducationCenter,
  onBuildEducationCenter,
  updateScores,
  weather,
}) => {
  const [buildings, setBuildings] = useState([]);
  const [randomEvent, setRandomEvent] = useState(null);
  const [playerId] = useState(1);
  const [currentWeather, setWeather] = useState('sunny'); // Rename setWeather for consistency

  const addBuilding = () => {
    const newBuilding = {
      id: buildings.length + 1,
      type: generateRandomBuildingType(),
      ecoLevel: 1,
    };
    setBuildings([...buildings, newBuilding]);
  };

  const upgradeBuilding = (id) => {
    setBuildings((prevBuildings) =>
      prevBuildings.map((building) =>
        building.id === id ? { ...building, ecoLevel: building.ecoLevel + 1 } : building
      )
    );
  };

  // ... Other functions (generateRandomBuildingType, handleRandomEvent, handlePollutionIncrease, etc.)

  const handleRandomEvent = () => {
    // Define different types of random events
    const events = [
      { description: 'Sudden increase in pollution!', impact: 'negative', action: handlePollutionIncrease },
      { description: 'Grant for renewable energy projects!', impact: 'positive', action: handleGrantForRenewableEnergy },
      // Add more events as needed
    ];

    // Randomly select an event
    const selectedEvent = events[Math.floor(Math.random() * events.length)];

    // Trigger the event
    setRandomEvent(selectedEvent);
    selectedEvent.action();
  };

  const handlePollutionIncrease = () => {
    setPollutionLevel((prevLevel) => prevLevel + 20); // Adjust the pollution level based on your game mechanics
  };

  const handleGrantForRenewableEnergy = () => {
    setResources((prevResources) => ({ ...prevResources, money: prevResources.money + 1000 }));
  };

  const handleCloseRandomEvent = () => {
    setRandomEvent(null);
  };

  const generateRandomBuildingType = () => {
    const buildingTypes = ['residential', 'commercial', 'industrial'];
    const randomIndex = Math.floor(Math.random() * buildingTypes.length);
    return buildingTypes[randomIndex];
  };
  
  const handleGameOver = () => {
    // Update scores when the game is over
    updateScores(playerId, resources.money);
  };

  const handleWeatherImpact = () => {
    if (currentWeather === 'sunny') {
      setResources((prevResources) => ({ ...prevResources, energy: prevResources.energy + 10 }));
      setPollutionLevel((prevLevel) => prevLevel - 5);
    } else if (currentWeather === 'rainy') {
      setResources((prevResources) => ({ ...prevResources, energy: prevResources.energy - 5 }));
      setPollutionLevel((prevLevel) => prevLevel + 5);
    }
    // Add more conditions for other weather states
  };

  useEffect(() => {
    handleWeatherImpact();
  }, [currentWeather]);

  const handleRandomWeatherEvent = () => {
    const weatherOptions = ['sunny', 'rainy', 'cloudy'];
    const randomWeather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
    setWeather(randomWeather);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleRandomWeatherEvent();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <CityContainer>
      <button onClick={addBuilding}>Build Eco-Friendly Building</button>
      <button onClick={handleRandomEvent}>Trigger Random Event</button>
      <div>
        {buildings.map((building) => (
          <Building
            key={building.id}
            type={building.type}
            ecoLevel={building.ecoLevel}
            onUpgrade={() => upgradeBuilding(building.id)}
          />
        ))}
      </div>
      {hasEducationCenter && <EducationCenter onBuildEducationCenter={onBuildEducationCenter} />}
      {randomEvent && <RandomEvent event={randomEvent} onClose={() => setRandomEvent(null)} />}
    </CityContainer>
  );
};

City.propTypes = {
  resources: PropTypes.object.isRequired,
  setResources: PropTypes.func.isRequired,
  setPollutionLevel: PropTypes.func.isRequired,
  hasEducationCenter: PropTypes.bool.isRequired,
  updateScores: PropTypes.func.isRequired,
  weather: PropTypes.string.isRequired,
};

export default City;
