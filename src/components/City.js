import React, { useState } from 'react';
import Building from './Building';
import { CityContainer } from '../styles';

const City = () => {
  const [buildings, setBuildings] = useState([]);

  const addBuilding = () => {
    const newBuilding = {
      id: buildings.length + 1,
      type: 'residential', // You can have different types like 'commercial', 'industrial', etc.
    };
    setBuildings([...buildings, newBuilding]);
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

export default City;
