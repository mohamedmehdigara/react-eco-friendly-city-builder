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
    </p>
    <button onClick={onCityExpansion}>Expand City</button>
  </CityExpansionContainer>
);

CityExpansion.propTypes = {
  currentCityZone: PropTypes.number.isRequired,
  onCityExpansion: PropTypes.func.isRequired,
};

export default CityExpansion;
