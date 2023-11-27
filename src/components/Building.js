import React from 'react';
import PropTypes from 'prop-types';
import { BuildingContainer, BuildingDetails, UpgradeButton } from '../styles';

const Building = ({ type, floors, color, ecoLevel, residents, onUpgrade }) => (
  <BuildingContainer type={type} color={color}>
    <p>{capitalizeFirstLetter(type)} Building</p>
    {floors && <BuildingDetails>Floors: {floors}</BuildingDetails>}
    {residents && <BuildingDetails>Residents: {residents}</BuildingDetails>}
    <BuildingDetails>Eco Level: {ecoLevel}</BuildingDetails>
    {ecoLevel < 5 && <UpgradeButton onClick={onUpgrade}>Upgrade</UpgradeButton>}
  </BuildingContainer>
);

Building.propTypes = {
  type: PropTypes.string.isRequired,
  floors: PropTypes.number,
  color: PropTypes.string,
  ecoLevel: PropTypes.number.isRequired,
  residents: PropTypes.number,
  onUpgrade: PropTypes.func.isRequired,
};

Building.defaultProps = {
  floors: 0,
  color: '#ccc',
};

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default Building;
