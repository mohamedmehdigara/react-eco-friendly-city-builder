// City.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Building from './Building';
import EducationCenter from './EducationCenter';
import RandomEvent from './RandomEvent'; // Import the RandomEvent component
import { CityContainer } from '../styles';

const City = ({ resources, setResources, setPollutionLevel, hasEducationCenter, onBuildEducationCenter }) => {
  const [buildings, setBuildings] = useState([]);
  const [randomEvent, setRandomEvent] = useState(null);

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
  
  // ... Other functions (generateRandomBuildingType, upgradeBuilding, etc.)

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
      {randomEvent && <RandomEvent event={randomEvent} onClose={handleCloseRandomEvent} />}
    </CityContainer>
  );
};

City.propTypes = {
  resources: PropTypes.object.isRequired,
  setResources: PropTypes.func.isRequired,
  setPollutionLevel: PropTypes.func.isRequired,
  hasEducationCenter: PropTypes.bool.isRequired,
};

export default City;
