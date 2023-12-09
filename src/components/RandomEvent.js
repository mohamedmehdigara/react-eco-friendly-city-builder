import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const RandomEventContainer = styled.div`
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-in-out;

  &.fade-in {
    opacity: 1;
  }

  ${({ isPositive }) =>
    isPositive &&
    css`
      background-color: #b9e8b9; /* Light green for positive events */
    `}

  ${({ isNegative }) =>
    isNegative &&
    css`
      background-color: #f8d7da; /* Light red for negative events */
    `}
`;

const RandomEvent = ({ event, onClose }) => {
  useEffect(() => {
    const eventContainer = document.querySelector('.random-event-container');
    if (eventContainer) {
      eventContainer.classList.add('fade-in');
    }

    return () => {
      if (eventContainer) {
        eventContainer.classList.remove('fade-in');
        eventContainer.classList.add('fade-out');
      }
    };
  }, []);

  const isPositiveEvent = event.impact === 'positive';
  const isNegativeEvent = event.impact === 'negative';

  return (
    <RandomEventContainer className="random-event-container" isPositive={isPositiveEvent} isNegative={isNegativeEvent}>
      <h2>Random Event</h2>
      <p>{event.description}</p>
      <button onClick={onClose}>Close</button>
    </RandomEventContainer>
  );
};

RandomEvent.propTypes = {
  event: PropTypes.shape({
    description: PropTypes.string.isRequired,
    impact: PropTypes.oneOf(['positive', 'negative']).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RandomEvent;
