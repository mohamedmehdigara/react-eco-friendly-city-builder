// Building.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BuildingContainer, BuildingDetails, UpgradeButton } from '../styles';

const Building = ({ type, floors, color, ecoLevel, residents, onUpgrade, onInfo }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleInfo = () => {
    // Toggle the showInfo state to display/hide building information
    setShowInfo(!showInfo);
  };

  return (
    <BuildingContainer type={type} color={color}>
      <p>{capitalizeFirstLetter(type)} Building</p>
      {floors && <BuildingDetails>Floors: {floors}</BuildingDetails>}
      {residents && <BuildingDetails>Residents: {residents}</BuildingDetails>}
      <BuildingDetails>Eco Level: {ecoLevel}</BuildingDetails>
      {renderUpgradeButton(ecoLevel, onUpgrade)}
      <button onClick={handleInfo}>Toggle Info</button>
      {showInfo && (
        <div>
          {/* Additional building information */}
          <p>Additional Information:</p>
          {/* Add more details as needed */}
        </div>
      )}
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
