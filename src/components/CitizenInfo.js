// CitizenInfo.js
import React from 'react';
import PropTypes from 'prop-types';

const CitizenInfo = ({ citizen, onEducate, onPromote }) => {
  const handleEducate = () => {
    // Implement logic to educate the citizen and increase awareness
    onEducate(citizen.id);
  };

  const handlePromote = () => {
    // Implement logic to promote eco-friendly practices to the citizen
    onPromote(citizen.id);
  };

  return (
    <div>
      <h2>Citizen Information</h2>
      <p>ID: {citizen.id}</p>
      <p>Name: {citizen.name}</p>
      <p>Age: {citizen.age}</p>
      <p>Awareness Level: {citizen.awarenessLevel}</p>
      <p>Adopted Practices: {citizen.adoptedPractices.join(', ')}</p>
      <button onClick={handleEducate}>Educate</button>
      <button onClick={handlePromote}>Promote Eco-Friendly Practices</button>
    </div>
  );
};

CitizenInfo.propTypes = {
  citizen: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    awarenessLevel: PropTypes.number.isRequired,
    adoptedPractices: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onEducate: PropTypes.func.isRequired,
  onPromote: PropTypes.func.isRequired,
};

export default CitizenInfo;
