// Leaderboard.js

import React from 'react';
import PropTypes from 'prop-types';

const Leaderboard = ({ scores }) => (
  <div>
    <h2>Leaderboard</h2>
    <ul>
      {scores.map((score) => (
        <li key={score.id}>
          {score.name}: {score.score}
        </li>
      ))}
    </ul>
  </div>
);

Leaderboard.propTypes = {
  scores: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Leaderboard;
