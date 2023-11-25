// Challenges.js
import React from 'react';
import PropTypes from 'prop-types';

const Challenges = ({ challenges }) => (
  <div>
    <h2>Challenges</h2>
    <ul>
      {challenges.map((challenge) => (
        <li key={challenge.id} style={{ textDecoration: challenge.completed ? 'line-through' : 'none' }}>
          {challenge.description}
        </li>
      ))}
    </ul>
  </div>
);

Challenges.propTypes = {
  challenges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default Challenges;
