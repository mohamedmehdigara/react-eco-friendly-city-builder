// CityMap.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  MapContainer,
  Zone,
  ZoneLabel,
} from './styles'; // Assuming you'll add these to styles.js

const CityMap = ({ cityZones }) => {
  return (
    <MapContainer>
      <h2>City Map</h2>
      {cityZones &&
        cityZones.map((zone) => (
          <Zone key={zone.id} style={{ gridArea: zone.area }}>
            <ZoneLabel>{zone.name}</ZoneLabel>
          </Zone>
        ))}
      {!cityZones || cityZones.length === 0 ? (
        <p>No city zones established yet.</p>
      ) : null}
    </MapContainer>
  );
};

CityMap.propTypes = {
  cityZones: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      area: PropTypes.string.isRequired, // CSS grid-area value
    })
  ).isRequired,
};

CityMap.defaultProps = {
  cityZones: [],
};

export default CityMap;