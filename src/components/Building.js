import React from 'react';
import PropTypes from 'prop-types';
import { BuildingContainer, BuildingDetails } from '../styles'; // Assuming you have a BuildingDetails styled component

// Building component with destructuring in the parameter
const Building = ({ type, floors, color }) => (
  <BuildingContainer type={type} color={color}>
    {/* Capitalize the first letter of the building type */}
    <p>{capitalizeFirstLetter(type)} Building</p>
    
    {/* Display additional building details if available */}
    {floors && <BuildingDetails>Floors: {floors}</BuildingDetails>}
  </BuildingContainer>
);

// PropTypes for type validation
Building.propTypes = {
  type: PropTypes.string.isRequired,
  floors: PropTypes.number, // Optional: Number of floors
  color: PropTypes.string, // Optional: Custom color for the building
};

// Default props for optional properties
Building.defaultProps = {
  floors: 0,
  color: '#ccc',
};

// Function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default Building;
