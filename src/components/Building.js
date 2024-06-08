import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Import styled components
import {
  BuildingContainer,
  BuildingDetails,
  UpgradeButton,
  BuildingInfo,
  BuildingLabel,
  ResidentIcon,
  EcoLevelIcon,
  SolarPanelIcon,
} from './styles'; // Adjust path as needed

const Building = ({ type, floors, color, ecoLevel, residents, onUpgrade, onInfo }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <BuildingContainer type={type} color={color}>
      <BuildingLabel>
        {capitalizeFirstLetter(type)} Building
      </BuildingLabel>

      <BuildingDetails>
        <ResidentIcon /> {residents} Residents
      </BuildingDetails>
      <BuildingDetails>
        <EcoLevelIcon /> Eco Level: {ecoLevel}
      </BuildingDetails>
      {ecoLevel < 5 && <UpgradeButton onClick={onUpgrade}>Upgrade</UpgradeButton>}

      <button onClick={handleInfo}>Toggle Info</button>

      {showInfo && (
        <BuildingInfo>
          <p>Floors: {floors}</p>
          {/* Add more details as needed */}
          <p>Energy Source: {/* Display energy source based on ecoLevel */}</p>
          <p>Waste Management: {/* Display waste management details */}</p>
        </BuildingInfo>
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

export default Building;
