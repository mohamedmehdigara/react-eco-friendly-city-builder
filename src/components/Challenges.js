// Challenges.js
import React from 'react';
import PropTypes from 'prop-types';

const Challenges = ({ challenges, onToggleChallenge }) => {
  const handleToggleChallenge = (id) => {
    // Implement logic to toggle the completion status of the challenge
    onToggleChallenge(id);
  };

  return (
    <div>
      <h2>Challenges</h2>
      <ul>
        {challenges.map(({ id, description, completed }) => (
          <li key={id} style={getListItemStyle(completed)}>
            {description}
            <button onClick={() => handleToggleChallenge(id)}>
              {completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

Challenges.propTypes = {
  challenges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggleChallenge: PropTypes.func.isRequired,
};

const getListItemStyle = (completed) => ({
  textDecoration: completed ? 'line-through' : 'none',
  // Add more styles if needed
});

export default Challenges;
