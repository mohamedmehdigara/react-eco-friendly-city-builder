import React from 'react';
import PropTypes from 'prop-types';
import { PollutionMeterContainer } from '../styles';

const PollutionMeter = ({ pollutionLevel }) => {
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

  return (
    <PollutionMeterContainer>
      <h2>Pollution</h2>
      <p>Level: {pollutionLevel}</p>
      <div className="progress-bar" style={{ width: `${pollutionLevel}%`, backgroundColor: getProgressBarColor() }} />
      <p>Status: {getPollutionStatus()}</p>
    </PollutionMeterContainer>
  );
};

PollutionMeter.propTypes = {
  pollutionLevel: PropTypes.number.isRequired,
};

export default PollutionMeter;
