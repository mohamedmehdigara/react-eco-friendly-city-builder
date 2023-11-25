import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Building from './Building';
import { CityContainer } from '../styles';

const City = ({ buildings }) => {
  // Use the 'buildings' prop directly to initialize state
  const [cityBuildings, setCityBuildings] = useState(buildings || []);

  const addBuilding = () => {
    const newBuilding = {
      id: cityBuildings.length + 1,
      type: generateRandomBuildingType(),
    };
    setCityBuildings((prevBuildings) => [...prevBuildings, newBuilding]);
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
        {cityBuildings.map((building) => (
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
