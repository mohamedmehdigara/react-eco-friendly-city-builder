// CitizenInfo.js
import React from 'react';
import PropTypes from 'prop-types';

const CitizenInfo = ({ citizen }) => (
  <div>
    <h2>Citizen Awareness</h2>
    <p>Awareness Level: {citizen.awarenessLevel}</p>
    <p>Adopted Practices: {citizen.adoptedPractices.join(', ')}</p>
  </div>
);

CitizenInfo.propTypes = {
  citizen: PropTypes.shape({
    awarenessLevel: PropTypes.number.isRequired,
    adoptedPractices: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default CitizenInfo;
