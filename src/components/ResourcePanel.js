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
      {/* Add more resource types as needed */}
    </ResourcePanelContainer>
  );
};

ResourcePanel.propTypes = {
  resources: PropTypes.shape({
    money: PropTypes.number.isRequired,
    energy: PropTypes.number.isRequired,
    // Add more resource types as needed
  }).isRequired,
};

export default ResourcePanel;
