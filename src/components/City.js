// City.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Building from './Building';
import EducationCenter from './EducationCenter';
import RandomEvent from './RandomEvent';
import CityExpansion from './CityExpansion';
import CitizenInfo from './CitizenInfo'; // Import the CitizenInfo component
import { CityContainer } from '../styles';

const City = ({ resources, setResources, setPollutionLevel, hasEducationCenter, onBuildEducationCenter, updateScores, weather, citizens, setCitizens }) => {
  const [buildings, setBuildings] = useState([]);
  const [randomEvent, setRandomEvent] = useState(null);
  const [playerId] = useState(1);
  const [cityZone, setCityZone] = useState(1);
  const [setWeather] = useState('sunny');

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

  const handleRandomEvent = () => {
    const events = [
      { description: 'Sudden increase in pollution!', impact: 'negative', action: handlePollutionIncrease },
      { description: 'Grant for renewable energy projects!', impact: 'positive', action: handleGrantForRenewableEnergy },
    ];
    const selectedEvent = events[Math.floor(Math.random() * events.length)];

    setRandomEvent(selectedEvent);
    selectedEvent.action();
  };

  const handlePollutionIncrease = () => {
    setPollutionLevel((prevLevel) => prevLevel + 20);
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
    updateScores(playerId, resources.money);
  };

  const handleWeatherImpact = () => {
    if (weather === 'sunny') {
      setResources((prevResources) => ({
        ...prevResources,
        energy: prevResources.energy + 10,
      }));
      setPollutionLevel((prevLevel) => prevLevel - 5);
    } else if (weather === 'rainy') {
      setResources((prevResources) => ({
        ...prevResources,
        energy: prevResources.energy - 5,
      }));
      setPollutionLevel((prevLevel) => prevLevel + 5);
    }
  };

  useEffect(() => {
    handleWeatherImpact();
  }, [weather]);

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

  const handleCityExpansion = () => {
    setCityZone((prevZone) => prevZone + 1);
  };

  return (
    <CityContainer>
      <button onClick={addBuilding}>Build Eco-Friendly Building</button>
      <button onClick={handleRandomEvent}>Trigger Random Event</button>
      <div>
        {buildings.map((building) => (
          <Building key={building.id} type={building.type} ecoLevel={building.ecoLevel} onUpgrade={() => upgradeBuilding(building.id)} />
        ))}
      </div>
      {hasEducationCenter && <EducationCenter onBuildEducationCenter={onBuildEducationCenter} onUpgrade={upgradeBuilding} />}
      {randomEvent && <RandomEvent event={randomEvent} onClose={handleCloseRandomEvent} />}
      <CityExpansion currentCityZone={cityZone} onCityExpansion={handleCityExpansion} />
      <CitizenInfo citizens={citizens} />
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
  citizens: PropTypes.array.isRequired,
  setCitizens: PropTypes.func.isRequired,
};

export default City;
