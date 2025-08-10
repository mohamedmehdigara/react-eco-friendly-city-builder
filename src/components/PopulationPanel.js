import React from 'react';
import PropTypes from 'prop-types';
import {
  PopulationContainer,
  PanelTitle,
  PopulationStat,
  StatLabel,
  StatValue,
  StatIcon,
} from './styles'; // Assuming you'll add these to styles.js

const PopulationPanel = ({ populationData }) => {
  const { totalPopulation, happiness, growthRate, employmentRate } = populationData;

  return (
    <PopulationContainer>
      <PanelTitle>Population Overview</PanelTitle>

      <PopulationStat>
        <StatIcon>👥</StatIcon>
        <StatLabel>Total Population:</StatLabel>
        <StatValue>{totalPopulation}</StatValue>
      </PopulationStat>

      <PopulationStat>
        <StatIcon>😊</StatIcon>
        <StatLabel>Happiness:</StatLabel>
        <StatValue>{happiness}%</StatValue>
      </PopulationStat>

      <PopulationStat>
        <StatIcon>📈</StatIcon>
        <StatLabel>Growth Rate:</StatLabel>
        <StatValue>{growthRate}%</StatValue>
      </PopulationStat>

      <PopulationStat>
        <StatIcon>👷</StatIcon>
        <StatLabel>Employment:</StatLabel>
        <StatValue>{employmentRate}%</StatValue>
      </PopulationStat>

    </PopulationContainer>
  );
};

PopulationPanel.propTypes = {
  populationData: PropTypes.shape({
    totalPopulation: PropTypes.number.isRequired,
    happiness: PropTypes.number.isRequired,
    growthRate: PropTypes.number.isRequired,
    employmentRate: PropTypes.number.isRequired,
  }).isRequired,
};

export default PopulationPanel;
