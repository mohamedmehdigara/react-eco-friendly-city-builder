import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Import styled components
import { ChallengeList, ChallengeItem, ToggleButton, DeleteButton, NewChallengeInput, AddChallengeButton } from './styles'; // Adjust path as needed

const Challenges = ({ challenges, onToggleChallenge, onDeleteChallenge, onAddChallenge }) => {
  const [newChallenge, setNewChallenge] = useState('');

  const handleToggleChallenge = (id) => {
    onToggleChallenge(id);
  };

  const handleDeleteChallenge = (id) => {
    onDeleteChallenge(id);
  };

  const handleAddChallenge = () => {
    onAddChallenge(newChallenge);
    setNewChallenge(''); // Clear the input field after adding a challenge
  };

  return (
    <ChallengeList>
      <h2>Challenges</h2>
      <ul>
        {challenges.map(({ id, description, completed }) => (
          <ChallengeItem key={id}>
            <span>{description}</span>
            <div>
              <ToggleButton onClick={() => handleToggleChallenge(id)}>
                {completed ? 'Undo' : 'Complete'}
              </ToggleButton>
              <DeleteButton onClick={() => handleDeleteChallenge(id)}>Delete</DeleteButton>
            </div>
          </ChallengeItem>
        ))}
      </ul>

      {/* Form to add a new challenge */}
      <NewChallengeInput>
        <input
          type="text"
          value={newChallenge}
          onChange={(e) => setNewChallenge(e.target.value)}
          placeholder="Enter a new challenge"
        />
        <AddChallengeButton onClick={handleAddChallenge}>Add Challenge</AddChallengeButton>
      </NewChallengeInput>
    </ChallengeList>
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

export default Challenges;
