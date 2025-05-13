// CityBanner.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  BannerContainer,
  CityName,
  Logo,
  KeyInfo,
} from './styles'; // Assuming you'll add these to styles.js

const CityBanner = ({ cityName, logoSrc, citizenHappiness, budget }) => {
  return (
    <BannerContainer>
      {logoSrc && <Logo src={logoSrc} alt={`${cityName} Logo`} />}
      <CityName>{cityName}</CityName>
      <KeyInfo>Happiness: {citizenHappiness}%</KeyInfo>
      <KeyInfo>Budget: ${budget}</KeyInfo>
      {/* Add more key info as needed */}
    </BannerContainer>
  );
};

CityBanner.propTypes = {
  cityName: PropTypes.string.isRequired,
  logoSrc: PropTypes.string,
  citizenHappiness: PropTypes.number.isRequired,
  budget: PropTypes.number.isRequired,
};

CityBanner.defaultProps = {
  logoSrc: null,
};

export default CityBanner;