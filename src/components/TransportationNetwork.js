// TransportationNetwork.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  TransportationContainer,
  TransportModeItem,
  ModeName,
  UsageInfo,
  Icon, // You'll need to define styles for icons
} from './styles'; // Assuming you'll add these to styles.js

const TransportationNetwork = ({ modes }) => {
  return (
    <TransportationContainer>
      <h2>Sustainable Transportation</h2>
      {modes &&
        modes.map((mode) => (
          <TransportModeItem key={mode.id}>
            <span>
              {mode.type === 'electric_car' && <Icon>🚗</Icon>}
              {mode.type === 'bicycle' && <Icon>🚲</Icon>}
              {mode.type === 'bus' && <Icon>🚌</Icon>}
              {mode.type === 'train' && <Icon>🚆</Icon>}
              {mode.name}
            </span>
            <UsageInfo>Usage: {mode.usage}% of commuters</UsageInfo>
          </TransportModeItem>
        ))}
      {modes && modes.length === 0 && <p>No sustainable transportation modes currently available.</p>}
    </TransportationContainer>
  );
};

TransportationNetwork.propTypes = {
  modes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.oneOf(['electric_car', 'bicycle', 'bus', 'train']).isRequired,
      name: PropTypes.string.isRequired,
      usage: PropTypes.number.isRequired,
    })
  ).isRequired,
};

TransportationNetwork.defaultProps = {
  modes: [],
};

export default TransportationNetwork;