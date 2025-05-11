// RenewableEnergySources.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  RenewableEnergyContainer,
  EnergySourceItem,
  EnergyProduction,
  Icon, // You'll need to define styles for icons
} from './styles'; // Assuming you'll add these to styles.js

const RenewableEnergySources = ({ sources }) => {
  return (
    <RenewableEnergyContainer>
      <h2>Renewable Energy</h2>
      {sources &&
        sources.map((source) => (
          <EnergySourceItem key={source.id}>
            <span>
              {source.type === 'solar' && <Icon>☀️</Icon>}
              {source.type === 'wind' && <Icon>🌬️</Icon>}
              {source.type === 'hydro' && <Icon>💧</Icon>}
              {source.name}
            </span>
            <EnergyProduction>Production: {source.production} MW</EnergyProduction>
          </EnergySourceItem>
        ))}
      {sources && sources.length === 0 && <p>No renewable energy sources currently active.</p>}
    </RenewableEnergyContainer>
  );
};

RenewableEnergySources.propTypes = {
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.oneOf(['solar', 'wind', 'hydro']).isRequired,
      name: PropTypes.string.isRequired,
      production: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default RenewableEnergySources;