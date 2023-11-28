import React from 'react';
import PropTypes from 'prop-types';

const Challenges = ({ challenges }) => (
  <div>
    <h2>Challenges</h2>
    <ul>
      {challenges.map(({ id, description, completed }) => (
        <li key={id} style={getListItemStyle(completed)}>
          {description}
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

const getListItemStyle = (completed) => ({
  textDecoration: completed ? 'line-through' : 'none',
  // Add more styles if needed
});

export default Challenges;
