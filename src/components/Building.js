import React from 'react';
import PropTypes from 'prop-types';  // Import PropTypes for prop type validation
import { BuildingContainer } from '../styles';

const Building = ({ type }) => {
  return (
    <BuildingContainer type={type}>
      <p>{capitalizeFirstLetter(type)} Building</p>
    </BuildingContainer>
  );
};

// Prop type validation
Building.propTypes = {
  type: PropTypes.string.isRequired,
};

// Function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default Building;
