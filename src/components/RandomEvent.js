// RandomEvent.js
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const RandomEventContainer = styled.div`
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-in-out;

  &.fade-in {
    opacity: 1;
  }
`;

const RandomEvent = ({ event, onClose }) => {
  useEffect(() => {
    // Fade-in animation when the component mounts
    const eventContainer = document.querySelector('.random-event-container');
    if (eventContainer) {
      eventContainer.classList.add('fade-in');
    }

    return () => {
      // Cleanup or add exit animations if needed
      // For simplicity, I'm just removing the fade-in class here
      if (eventContainer) {
        eventContainer.classList.remove('fade-in');
      }
    };
  }, []);

  return (
    <RandomEventContainer className="random-event-container">
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
