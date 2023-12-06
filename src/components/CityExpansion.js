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

    {/* Additional options for city expansion based on the current zone */}
    {currentCityZone === 1 && (
      <div>
        <h3>Expansion Options</h3>
        <ul>
          <li>Build new residential areas</li>
          <li>Construct basic eco-friendly facilities</li>
        </ul>
      </div>
    )}

    {currentCityZone === 2 && (
      <div>
        <h3>Advanced Expansion</h3>
        <p>As your city grows, you can consider the following:</p>
        <ul>
          <li>Introduce renewable energy sources</li>
          <li>Establish eco-friendly transportation systems</li>
        </ul>
      </div>
    )}

    {currentCityZone === 3 && (
      <div>
        <h3>Metropolis Development</h3>
        <p>Your metropolis is ready for major developments:</p>
        <ul>
          <li>Research and implement cutting-edge technologies</li>
          <li>Enhance city infrastructure for maximum sustainability</li>
        </ul>
      </div>
    )}
  </CityExpansionContainer>
);

CityExpansion.propTypes = {
  currentCityZone: PropTypes.number.isRequired,
  onCityExpansion: PropTypes.func.isRequired,
};

export default CityExpansion;
