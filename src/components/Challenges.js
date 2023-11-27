import React from 'react';
import PropTypes from 'prop-types';

const Challenges = ({ challenges }) => (
  <div>
    <h2>Challenges</h2>
    <ul>
      {challenges.map((challenge) => (
        // Extracting styles to a separate object for better readability
        <li key={challenge.id} style={getListItemStyle(challenge.completed)}>
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

// Function to determine the style based on the completed status
const getListItemStyle = (completed) => ({
  textDecoration: completed ? 'line-through' : 'none',
  // Add more styles if needed
});

export default Challenges;
