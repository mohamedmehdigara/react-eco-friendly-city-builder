import React from 'react';
import PropTypes from 'prop-types';

// Import styled components
import { CitizenInfoContainer, CitizenItem } from './styles'; // Adjust path as needed

const CitizenInfo = ({ citizens }) => {
  return (
    <CitizenInfoContainer>
      <h2>Citizen Awareness</h2>
      {citizens && citizens.map((citizen) => (
        <CitizenItem key={citizen.id}>
          <p>Awareness Level: {citizen.awarenessLevel}</p>
          <p>Adopted Practices: {citizen.adoptedPractices.join(', ')}</p>
          {/* Add progress bar for awareness level (optional) */}
        </CitizenItem>
      ))}
    </CitizenInfoContainer>
  );
};

CitizenInfo.propTypes = {
  citizens: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      awarenessLevel: PropTypes.number.isRequired,
      adoptedPractices: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default CitizenInfo;
