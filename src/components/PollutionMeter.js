import React from 'react';
import PropTypes from 'prop-types';
import { PollutionMeterContainer } from '../styles';

const PollutionMeter = ({ pollutionLevel, onReducePollution }) => {
  const getPollutionStatus = () => {
    if (pollutionLevel < 30) {
      return 'Low';
    } else if (pollutionLevel < 70) {
      return 'Moderate';
    } else {
      return 'High';
    }
  };

  const getProgressBarColor = () => {
    if (pollutionLevel < 30) {
      return 'green';
    } else if (pollutionLevel < 70) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  const handleReducePollution = () => {
    // Implement logic to reduce pollution
    onReducePollution();
  };

  return (
    <PollutionMeterContainer>
      <h2>Pollution</h2>
      <p>Level: {pollutionLevel}</p>
      <div
        className={`progress-bar ${getProgressBarColor()}`}
        style={{ width: `${pollutionLevel}%` }}
        aria-live="assertive"
        aria-label={`Pollution Level: ${getPollutionStatus()}`}
      />
      <p>Status: {getPollutionStatus()}</p>
      {pollutionLevel >= 70 && (
        <div>
          <p>Warning: High pollution level! Take action to reduce pollution.</p>
          <button onClick={handleReducePollution}>Reduce Pollution</button>
        </div>
      )}
    </PollutionMeterContainer>
  );
};

PollutionMeter.propTypes = {
  pollutionLevel: PropTypes.number.isRequired,
  onReducePollution: PropTypes.func.isRequired,
};

export default PollutionMeter;
