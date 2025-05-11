// EcoProgress.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  EcoProgressContainer,
  ProgressItem,
  ProgressLabel,
  ProgressValue,
  ProgressBarContainer,
  ProgressBarFill,
} from './styles'; // Assuming you'll add these to styles.js

const EcoProgress = ({ progressData }) => {
  return (
    <EcoProgressContainer>
      <h2>City's Ecological Progress</h2>
      {progressData &&
        progressData.map((progress) => (
          <ProgressItem key={progress.id}>
            <ProgressLabel>{progress.label}:</ProgressLabel>
            <ProgressValue>{progress.value}{progress.unit}</ProgressValue>
            {progress.target && (
              <ProgressBarContainer>
                <ProgressBarFill progress={progress.value / progress.target} />
              </ProgressBarContainer>
            )}
            {!progress.target && <p>(No target set)</p>}
          </ProgressItem>
        ))}
      {progressData && progressData.length === 0 && (
        <p>No ecological progress data available.</p>
      )}
    </EcoProgressContainer>
  );
};

EcoProgress.propTypes = {
  progressData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      unit: PropTypes.string,
      target: PropTypes.number,
    })
  ).isRequired,
};

EcoProgress.defaultProps = {
  progressData: [],
};

export default EcoProgress;