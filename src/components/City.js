// City.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Building from './Building';
import EducationCenter from './EducationCenter'; // Import the EducationCenter component
import { CityContainer } from '../styles';

const City = ({ resources, setResources, setPollutionLevel, hasEducationCenter, onBuildEducationCenter }) => {
  const [buildings, setBuildings] = useState([]);

  const addBuilding = () => {
    const newBuilding = {
      id: buildings.length + 1,
      type: generateRandomBuildingType(),
      ecoLevel: 1,
    };
    setBuildings([...buildings, newBuilding]);
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

  console.log('hasEducationCenter:', hasEducationCenter);


  return (
    <CityContainer>
      <button onClick={addBuilding}>Build Eco-Friendly Building</button>
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
      {hasEducationCenter && <EducationCenter onBuildEducationCenter={onBuildEducationCenter} />} {/* Render EducationCenter if it has been built */}

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
