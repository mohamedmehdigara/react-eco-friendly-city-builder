// EcoActions.js
import React from 'react';
import { EcoActionsContainer } from '../styles';

const EcoActions = ({ onEcoAction }) => (
  <EcoActionsContainer>
    <h2>Eco-Friendly Actions</h2>
    <button onClick={() => onEcoAction('plantTrees')}>
      <span role="img" aria-label="Tree">
        🌳
      </span>{' '}
      Plant Trees
    </button>
    <button onClick={() => onEcoAction('renewableEnergy')}>
      <span role="img" aria-label="Wind Turbine">
        🍃
      </span>{' '}
      Use Renewable Energy
    </button>
    <button onClick={() => onEcoAction('recycle')}>
      <span role="img" aria-label="Recycle">
        ♻️
      </span>{' '}
      Recycle
    </button>
    <button onClick={() => onEcoAction('reduceWaste')}>
      <span role="img" aria-label="Waste">
        🗑️
      </span>{' '}
      Reduce Waste
    </button>
    {/* Add more eco-friendly actions as needed */}
  </EcoActionsContainer>
);

export default EcoActions;
