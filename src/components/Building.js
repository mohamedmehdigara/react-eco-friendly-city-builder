import React from 'react';
import { BuildingContainer } from '../styles';

const Building = ({ type }) => {
  return (
    <BuildingContainer type={type}>
      <p>{type.charAt(0).toUpperCase() + type.slice(1)} Building</p>
    </BuildingContainer>
  );
};

export default Building;
