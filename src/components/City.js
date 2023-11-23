import React, { useState } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes for prop type validation
import Building from './Building';
import { CityContainer } from '../styles';

const City = () => {
  const [buildings, setBuildings] = useState([]);

  const addBuilding = () => {
    const newBuilding = {
      id: buildings.length + 1,
      type: generateRandomBuildingType(), // Use a function to generate a random building type
    };
    setBuildings([...buildings, newBuilding]);
  };

  const generateRandomBuildingType = () => {
    const buildingTypes = ['residential', 'commercial', 'industrial']; // Add more types as needed
    const randomIndex = Math.floor(Math.random() * buildingTypes.length);
    return buildingTypes[randomIndex];
  };

  return (
    <CityContainer>
      <button onClick={addBuilding}>Build Eco-Friendly Building</button>
      <div>
        {buildings.map((building) => (
          <Building key={building.id} type={building.type} />
        ))}
      </div>
    </CityContainer>
  );
};

// Prop type validation
City.propTypes = {
  buildings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    })
  ),
};

export default City;
