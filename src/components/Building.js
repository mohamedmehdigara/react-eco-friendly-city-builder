// Building.js
import React from 'react';
import PropTypes from 'prop-types';
import { BuildingContainer, BuildingDetails, UpgradeButton } from '../styles';

const Building = ({ type, floors, color, ecoLevel, residents, onUpgrade, onInfo }) => {
  const handleInfo = () => {
    // Implement logic to display detailed information about the building
    onInfo({ type, floors, color, ecoLevel, residents });
  };

  return (
    <BuildingContainer type={type} color={color}>
      <p>{capitalizeFirstLetter(type)} Building</p>
      {floors && <BuildingDetails>Floors: {floors}</BuildingDetails>}
      {residents && <BuildingDetails>Residents: {residents}</BuildingDetails>}
      <BuildingDetails>Eco Level: {ecoLevel}</BuildingDetails>
      {renderUpgradeButton(ecoLevel, onUpgrade)}
      <button onClick={handleInfo}>Building Info</button>
    </BuildingContainer>
  );
};

Building.propTypes = {
  type: PropTypes.string.isRequired,
  floors: PropTypes.number,
  color: PropTypes.string,
  ecoLevel: PropTypes.number.isRequired,
  residents: PropTypes.number,
  onUpgrade: PropTypes.func.isRequired,
  onInfo: PropTypes.func.isRequired,
};

Building.defaultProps = {
  floors: 0,
  color: '#ccc',
};

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const renderUpgradeButton = (ecoLevel, onUpgrade) => {
  return ecoLevel < 5 && <UpgradeButton onClick={onUpgrade}>Upgrade</UpgradeButton>;
};

export default Building;
