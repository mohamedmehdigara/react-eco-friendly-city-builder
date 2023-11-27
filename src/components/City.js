// City.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Building from './Building';
import EducationCenter from './EducationCenter';
import { CityContainer } from '../styles';

const City = () => {
  const [buildings, setBuildings] = useState([]);
  const [hasEducationCenter, setHasEducationCenter] = useState(false);

  const addBuilding = () => {
    const newBuilding = {
      id: buildings.length + 1,
      type: generateRandomBuildingType(),
      ecoLevel: 1,
    };
    setBuildings((prevBuildings) => [...prevBuildings, newBuilding]);
  };

  const generateRandomBuildingType = () => {
    const buildingTypes = ['residential', 'commercial', 'industrial'];
    const randomIndex = Math.floor(Math.random() * buildingTypes.length);
    return buildingTypes[randomIndex];
  };

  const upgradeBuilding = (id) => {
    setBuildings((prevBuildings) =>
      prevBuildings.map((building) =>
        building.id === id ? { ...building, ecoLevel: building.ecoLevel + 1 } : building
      )
    );
  };

  const buildEducationCenter = () => {
    setHasEducationCenter(true);
    // Add logic for any bonuses or effects on eco-friendliness or resource production
  };

  return (
    <CityContainer>
      <button onClick={addBuilding}>Build Eco-Friendly Building</button>
      {hasEducationCenter ? (
        <EducationCenter onBuildEducationCenter={buildEducationCenter} />
      ) : null}
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
    </CityContainer>
  );
};

City.propTypes = {
  buildings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      ecoLevel: PropTypes.number.isRequired,
    })
  ),
};

export default City;
