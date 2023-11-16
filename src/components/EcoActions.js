import React from 'react';
import { EcoActionsContainer } from '../styles';

const EcoActions = ({ onEcoAction }) => {
  const handleEcoAction = (actionType) => {
    // Implement logic to perform eco-friendly actions
    onEcoAction(actionType);
  };

  return (
    <EcoActionsContainer>
      <h2>Eco-Friendly Actions</h2>
      <button onClick={() => handleEcoAction('plantTrees')}>Plant Trees</button>
      <button onClick={() => handleEcoAction('renewableEnergy')}>Use Renewable Energy</button>
      {/* Add more eco-friendly actions */}
    </EcoActionsContainer>
  );
};

export default EcoActions;
