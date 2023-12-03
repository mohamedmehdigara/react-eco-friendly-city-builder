// Challenges.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Challenges = ({ challenges, onToggleChallenge, onDeleteChallenge, onAddChallenge }) => {
  const [newChallenge, setNewChallenge] = useState('');

  const handleToggleChallenge = (id) => {
    // Implement logic to toggle the completion status of the challenge
    onToggleChallenge(id);
  };

  const handleDeleteChallenge = (id) => {
    // Implement logic to delete the challenge
    onDeleteChallenge(id);
  };

  const handleAddChallenge = () => {
    // Implement logic to add a new challenge
    onAddChallenge(newChallenge);
    setNewChallenge(''); // Clear the input field after adding a challenge
  };

  return (
    <div>
      <h2>Challenges</h2>
      <ul>
        {challenges.map(({ id, description, completed }) => (
          <li key={id} style={getListItemStyle(completed)}>
            <span>{description}</span>
            <div>
              <button onClick={() => handleToggleChallenge(id)}>
                {completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => handleDeleteChallenge(id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Form to add a new challenge */}
      <div>
        <input
          type="text"
          value={newChallenge}
          onChange={(e) => setNewChallenge(e.target.value)}
          placeholder="Enter a new challenge"
        />
        <button onClick={handleAddChallenge}>Add Challenge</button>
      </div>
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
  onDeleteChallenge: PropTypes.func.isRequired,
  onAddChallenge: PropTypes.func.isRequired,
};

const getListItemStyle = (completed) => ({
  textDecoration: completed ? 'line-through' : 'none',
  // Add more styles if needed
});

export default Challenges;
