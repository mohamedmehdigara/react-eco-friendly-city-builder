// WasteManagement.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  WasteManagementContainer,
  WasteTypeItem,
  CollectionMethod,
  RecyclingRate,
  Icon, // You'll likely want icons here too
} from './styles'; // Assuming you'll add these to styles.js

const WasteManagement = ({ wasteData }) => {
  return (
    <WasteManagementContainer>
      <h2>Waste Management</h2>
      {wasteData &&
        wasteData.map((wasteType) => (
          <WasteTypeItem key={wasteType.id}>
            <span>
              {wasteType.type === 'municipal' && <Icon>🗑️</Icon>}
              {wasteType.type === 'recyclable' && <Icon>♻️</Icon>}
              {wasteType.type === 'organic' && <Icon>🌱</Icon>}
              {wasteType.name}
            </span>
            <CollectionMethod>Collection: {wasteType.collectionMethod}</CollectionMethod>
            <RecyclingRate>Recycling Rate: {wasteType.recyclingRate}%</RecyclingRate>
          </WasteTypeItem>
        ))}
      {wasteData && wasteData.length === 0 && <p>No waste management data available.</p>}
    </WasteManagementContainer>
  );
};

WasteManagement.propTypes = {
  wasteData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['municipal', 'recyclable', 'organic']).isRequired,
      collectionMethod: PropTypes.string.isRequired,
      recyclingRate: PropTypes.number.isRequired,
    })
  ).isRequired,
};

WasteManagement.defaultProps = {
  wasteData: [],
};

export default WasteManagement;