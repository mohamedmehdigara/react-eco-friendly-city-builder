// ResourceManager.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  ResourceManagerContainer,
  ResourceCategory,
  CategoryTitle,
  ResourceItem,
  ResourceLabel,
  ResourceValue,
  ResourceDetailsButton,
  // DetailsPanel, // Not used in this basic version
  // DetailsItem, // Not used in this basic version
} from './styles'; // Assuming you'll add these to styles.js

const ResourceManager = ({ resources, onResourceDetails }) => {
  return (
    <ResourceManagerContainer>
      <h2>Resource Management</h2>

      <ResourceCategory>
        <CategoryTitle>Core Resources</CategoryTitle>
        <ResourceItem>
          <ResourceLabel>Money:</ResourceLabel>
          <ResourceValue>${resources.money}</ResourceValue>
          {onResourceDetails && (
            <ResourceDetailsButton onClick={() => onResourceDetails('money')}>Details</ResourceDetailsButton>
          )}
        </ResourceItem>
        <ResourceItem>
          <ResourceLabel>Energy:</ResourceLabel>
          <ResourceValue>{resources.energy} MW</ResourceValue>
          {onResourceDetails && (
            <ResourceDetailsButton onClick={() => onResourceDetails('energy')}>Details</ResourceDetailsButton>
          )}
        </ResourceItem>
        {/* Add more core resources */}
      </ResourceCategory>

      <ResourceCategory>
        <CategoryTitle>Environmental Factors</CategoryTitle>
        <ResourceItem>
          <ResourceLabel>Pollution:</ResourceLabel>
          <ResourceValue>{resources.pollutionLevel}%</ResourceValue>
          {onResourceDetails && (
            <ResourceDetailsButton onClick={() => onResourceDetails('pollution')}>Details</ResourceDetailsButton>
          )}
        </ResourceItem>
        {/* Add more environmental factors */}
      </ResourceCategory>

      {/* Add more resource categories as needed */}
    </ResourceManagerContainer>
  );
};

ResourceManager.propTypes = {
  resources: PropTypes.shape({
    money: PropTypes.number.isRequired,
    energy: PropTypes.number.isRequired,
    pollutionLevel: PropTypes.number.isRequired,
    // Add more resource properties as needed
  }).isRequired,
  onResourceDetails: PropTypes.func, // Optional function to handle details button click
};

ResourceManager.defaultProps = {
  onResourceDetails: null,
};

export default ResourceManager;