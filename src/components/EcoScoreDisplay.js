// EcoScoreDisplay.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  EcoScoreContainer,
  ScoreItem,
  ScoreLabel,
  ScoreValue,
  OverallScore,
  ScoreTitle,
} from './styles'; // Assuming you'll add these to styles.js

const EcoScoreDisplay = ({ ecoScoreData }) => {
  const calculateOverallScore = (data) => {
    let totalScore = 0;
    let weightSum = 0;
    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key].value !== undefined && data[key].weight !== undefined) {
        totalScore += data[key].value * data[key].weight;
        weightSum += data[key].weight;
      }
    }
    return weightSum > 0 ? Math.round(totalScore / weightSum) : 0;
  };

  const overallScore = calculateOverallScore(ecoScoreData);

  return (
    <EcoScoreContainer>
      <ScoreTitle>City Eco Score</ScoreTitle>
      <OverallScore>{overallScore}%</OverallScore>
      {Object.keys(ecoScoreData).map((key) => (
        <ScoreItem key={key}>
          <ScoreLabel>{ecoScoreData[key].label}:</ScoreLabel>
          <ScoreValue>{ecoScoreData[key].value}%</ScoreValue>
        </ScoreItem>
      ))}
    </EcoScoreContainer>
  );
};

EcoScoreDisplay.propTypes = {
  ecoScoreData: PropTypes.shape({
    pollutionReduction: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      weight: PropTypes.number.isRequired,
    }),
    renewableEnergy: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      weight: PropTypes.number.isRequired,
    }),
    biodiversity: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      weight: PropTypes.number.isRequired,
    }),
    // Add more metrics as needed
  }).isRequired,
};

export default EcoScoreDisplay;