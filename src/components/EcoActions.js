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
  </EcoActionsContainer>
);

export default EcoActions;
