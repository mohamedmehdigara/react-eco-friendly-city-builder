// RandomEvent.js
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { RandomEventContainer } from '../styles';

const RandomEvent = ({ event, onClose }) => {
  useEffect(() => {
    // You can add animations or additional effects when the component mounts
    // For example, fading in or sliding down
    return () => {
      // Cleanup or add exit animations if needed
    };
  }, []);

  return (
    <RandomEventContainer>
      <h2>Random Event</h2>
      <p>{event.description}</p>
      <button onClick={onClose}>Close</button>
    </RandomEventContainer>
  );
};

RandomEvent.propTypes = {
  event: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RandomEvent;
