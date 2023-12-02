// CitizenInfo.js
import React from 'react';
import PropTypes from 'prop-types';

const CitizenInfo = ({ citizens }) => (
  <div>
    <h2>Citizen Awareness</h2>
    {citizens && citizens.map((citizen) => (
      <div key={citizen.id}>
        <p>Awareness Level: {citizen.awarenessLevel}</p>
        <p>Adopted Practices: {citizen.adoptedPractices.join(', ')}</p>
      </div>
    ))}
  </div>
);

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
