// ConstructionPanel.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  ConstructionContainer,
  BuildingItem,
  BuildingName,
  BuildingCost,
  ConstructButton,
} from './styles'; // Assuming you'll add these to styles.js

const ConstructionPanel = ({ availableBuildings, onConstructBuilding, resources }) => {
  return (
    <ConstructionContainer>
      <h2>Construction</h2>
      {availableBuildings && availableBuildings.length > 0 ? (
        availableBuildings.map((building) => (
          <BuildingItem key={building.id}>
            <BuildingName>{building.name}</BuildingName>
            <BuildingCost>Cost: ${building.cost}</BuildingCost>
            <ConstructButton
              onClick={() => onConstructBuilding(building)}
              disabled={resources.money < building.cost}
            >
              {resources.money < building.cost ? 'Insufficient Funds' : 'Construct'}
            </ConstructButton>
          </BuildingItem>
        ))
      ) : (
        <p>No buildings currently available for construction.</p>
      )}
    </ConstructionContainer>
  );
};

ConstructionPanel.propTypes = {
  availableBuildings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
      // Add other building properties as needed
    })
  ).isRequired,
  onConstructBuilding: PropTypes.func.isRequired,
  resources: PropTypes.shape({
    money: PropTypes.number.isRequired,
    // Add other relevant resource properties
  }).isRequired,
};

export default ConstructionPanel;