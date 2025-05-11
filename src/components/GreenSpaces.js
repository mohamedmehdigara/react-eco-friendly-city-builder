// GreenSpaces.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  GreenSpacesContainer,
  ParkItem,
  ParkName,
  ParkDetails,
  FeatureTag,
} from './styles'; // Assuming you'll add these to styles.js

const GreenSpaces = ({ parks }) => {
  return (
    <GreenSpacesContainer>
      <h2>Green Spaces & Parks</h2>
      {parks &&
        parks.map((park) => (
          <ParkItem key={park.id}>
            <ParkName>{park.name}</ParkName>
            <ParkDetails>Size: {park.size} hectares</ParkDetails>
            {park.ecoFeatures && park.ecoFeatures.length > 0 && (
              <div>
                <ParkDetails>Eco Features:</ParkDetails>
                {park.ecoFeatures.map((feature, index) => (
                  <FeatureTag key={index}>{feature}</FeatureTag>
                ))}
              </div>
            )}
          </ParkItem>
        ))}
      {parks && parks.length === 0 && <p>No green spaces currently exist.</p>}
    </GreenSpacesContainer>
  );
};

GreenSpaces.propTypes = {
  parks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      ecoFeatures: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

GreenSpaces.defaultProps = {
  parks: [],
};

export default GreenSpaces;