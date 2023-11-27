// RandomEvent.js
import React from 'react';
import PropTypes from 'prop-types';
import { RandomEventContainer } from '../styles';

const RandomEvent = ({ event, onClose }) => (
  <RandomEventContainer>
    <h2>Random Event</h2>
    <p>{event.description}</p>
    <button onClick={onClose}>Close</button>
  </RandomEventContainer>
);

RandomEvent.propTypes = {
  event: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RandomEvent;
