// CityExpansion.js
import React from 'react';
import PropTypes from 'prop-types';
import { CityExpansionContainer } from '../styles';

const CityExpansion = ({ currentCityZone, onCityExpansion }) => (
  <CityExpansionContainer>
    <h2>City Expansion</h2>
    <p>
      Current City Zone: {currentCityZone}
      {/* Add more information about the benefits or implications of expanding the city */}
      {currentCityZone === 1 && (
        <span> - Your city is in the early stages of development. Consider expanding to attract more residents and resources.</span>
      )}
      {currentCityZone === 2 && (
        <span> - The city is growing! More opportunities for eco-friendly buildings and advanced technologies await.</span>
      )}
      {currentCityZone === 3 && (
        <span> - A thriving metropolis! Expand further to unlock the full potential of sustainable living.</span>
      )}
    </p>
    <button onClick={onCityExpansion}>Expand City</button>
  </CityExpansionContainer>
);

CityExpansion.propTypes = {
  currentCityZone: PropTypes.number.isRequired,
  onCityExpansion: PropTypes.func.isRequired,
};

export default CityExpansion;
