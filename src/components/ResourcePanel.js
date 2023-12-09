// ResourcePanel.js
import React from 'react';
import PropTypes from 'prop-types';
import { ResourcePanelContainer } from '../styles';

const ResourcePanel = ({ resources }) => {
  return (
    <ResourcePanelContainer>
      <h2>Resources</h2>
      <div className="resource-item">
        <span className="resource-label">Money:</span>
        <span className="resource-value">${resources.money}</span>
      </div>
      <div className="resource-item">
        <span className="resource-label">Energy:</span>
        <span className="resource-value">{resources.energy} kW</span>
      </div>
      <div className="resource-item">
        <span className="resource-label">Water:</span>
        <span className="resource-value">{resources.water} gallons</span>
      </div>
      <div className="resource-item">
        <span className="resource-label">Materials:</span>
        <span className="resource-value">{resources.materials} units</span>
      </div>
      {/* Add more resource types as needed */}
      <div className="resource-item">
        <span className="resource-label">Research Points:</span>
        <span className="resource-value">{resources.researchPoints}</span>
      </div>
      <div className="resource-item">
        <span className="resource-label">Population:</span>
        <span className="resource-value">{resources.population}</span>
      </div>
      {/* Add more resource types as needed */}
    </ResourcePanelContainer>
  );
};

ResourcePanel.propTypes = {
  resources: PropTypes.shape({
    money: PropTypes.number.isRequired,
    energy: PropTypes.number.isRequired,
    water: PropTypes.number.isRequired,
    materials: PropTypes.number.isRequired,
    // Add more resource types as needed
    researchPoints: PropTypes.number.isRequired,
    population: PropTypes.number.isRequired,
    // Add more resource types as needed
  }).isRequired,
};

export default ResourcePanel;
