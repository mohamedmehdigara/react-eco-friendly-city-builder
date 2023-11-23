import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import { EcoActionsContainer } from '../styles';

const EcoActions = ({ onEcoAction }) => {
  const handleEcoAction = (actionType) => {
    // Implement logic to perform eco-friendly actions
    onEcoAction(actionType);
  };

  return (
    <EcoActionsContainer>
      <h2>Eco-Friendly Actions</h2>
      <ActionButton label="Plant Trees" actionType="plantTrees" onClick={handleEcoAction} />
      <ActionButton label="Use Renewable Energy" actionType="renewableEnergy" onClick={handleEcoAction} />
      {/* Add more eco-friendly actions */}
    </EcoActionsContainer>
  );
};

const ActionButton = ({ label, actionType, onClick }) => (
  <button onClick={() => onClick(actionType)}>{label}</button>
);

// Prop type validation
EcoActions.propTypes = {
  onEcoAction: PropTypes.func.isRequired,
};

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  actionType: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default EcoActions;
