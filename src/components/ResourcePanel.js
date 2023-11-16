import React from 'react';
import { ResourcePanelContainer } from '../styles';

const ResourcePanel = ({ resources }) => {
  return (
    <ResourcePanelContainer>
      <h2>Resources</h2>
      <p>Money: ${resources.money}</p>
      <p>Energy: {resources.energy} kW</p>
      {/* Add more resource types as needed */}
    </ResourcePanelContainer>
  );
};

export default ResourcePanel;
