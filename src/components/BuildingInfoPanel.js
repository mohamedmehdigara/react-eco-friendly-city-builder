// BuildingInfoPanel.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  InfoPanelContainer,
  PanelTitle,
  InfoItem,
  InfoLabel,
  InfoValue,
  UpgradeList,
  UpgradeItem,
} from './styles'; // Assuming you'll add these to styles.js

const BuildingInfoPanel = ({ building }) => {
  if (!building) {
    return <InfoPanelContainer><PanelTitle>Select a Building</PanelTitle></InfoPanelContainer>;
  }

  return (
    <InfoPanelContainer>
      <PanelTitle>{building.name}</PanelTitle>
      <InfoItem>
        <InfoLabel>Function:</InfoLabel>
        <InfoValue>{building.function}</InfoValue>
      </InfoItem>
      {building.production && Object.keys(building.production).length > 0 && (
        <InfoItem>
          <InfoLabel>Production:</InfoLabel>
          <InfoValue>
            {Object.entries(building.production)
              .map(([resource, amount]) => `${resource}: +${amount}/cycle`)
              .join(', ')}
          </InfoValue>
        </InfoItem>
      )}
      {building.consumption && Object.keys(building.consumption).length > 0 && (
        <InfoItem>
          <InfoLabel>Consumption:</InfoLabel>
          <InfoValue>
            {Object.entries(building.consumption)
              .map(([resource, amount]) => `${resource}: -${amount}/cycle`)
              .join(', ')}
          </InfoValue>
        </InfoItem>
      )}
      {building.pollution && building.pollution !== 0 && (
        <InfoItem>
          <InfoLabel>Pollution:</InfoLabel>
          <InfoValue>{building.pollution > 0 ? `+${building.pollution}` : building.pollution}/cycle</InfoValue>
        </InfoItem>
      )}
      {building.upgrades && building.upgrades.length > 0 && (
        <>
          <InfoLabel>Upgrades:</InfoLabel>
          <UpgradeList>
            {building.upgrades.map((upgrade) => (
              <UpgradeItem key={upgrade.id}>{upgrade.name} ({upgrade.effect})</UpgradeItem>
            ))}
          </UpgradeList>
        </>
      )}
      {building.effects && building.effects.length > 0 && (
        <>
          <InfoLabel>Active Effects:</InfoLabel>
          <UpgradeList>
            {building.effects.map((effect) => (
              <UpgradeItem key={effect.id}>{effect.name} ({effect.description})</UpgradeItem>
            ))}
          </UpgradeList>
        </>
      )}
      {/* Add more building details as needed */}
    </InfoPanelContainer>
  );
};

BuildingInfoPanel.propTypes = {
  building: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    function: PropTypes.string,
    production: PropTypes.objectOf(PropTypes.number), // { energy: 10, food: 5 }
    consumption: PropTypes.objectOf(PropTypes.number), // { water: 2 }
    pollution: PropTypes.number,
    upgrades: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        effect: PropTypes.string.isRequired,
      })
    ),
    effects: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ),
    // Add other relevant building properties
  }),
};

export default BuildingInfoPanel;