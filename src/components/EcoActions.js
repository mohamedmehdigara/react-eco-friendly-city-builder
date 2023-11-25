// EcoActions.js
import React from 'react';
import { EcoActionsContainer } from '../styles';

const EcoActions = ({ onEcoAction }) => (
  <EcoActionsContainer>
    <h2>Eco-Friendly Actions</h2>
    <button onClick={() => onEcoAction('plantTrees')}>Plant Trees</button>
    <button onClick={() => onEcoAction('renewableEnergy')}>
      Use Renewable Energy
    </button>
  </EcoActionsContainer>
);

export default EcoActions;

