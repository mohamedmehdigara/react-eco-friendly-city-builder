// TechnologyTree.js
import React from 'react';
import PropTypes from 'prop-types';
import { TechnologyTreeContainer } from '../styles';

const TechnologyTree = ({ technologies, onResearch }) => (
  <TechnologyTreeContainer>
    <h2>Technology Tree</h2>
    <ul>
      <li>
        Cleaner Energy
        {!technologies.cleanerEnergy && <button onClick={() => onResearch('cleanerEnergy')}>Research</button>}
      </li>
      <li>
        Advanced Waste Management
        {!technologies.advancedWasteManagement && (
          <button onClick={() => onResearch('advancedWasteManagement')}>Research</button>
        )}
      </li>
      <li>
        Innovative Transportation
        {!technologies.innovativeTransportation && (
          <button onClick={() => onResearch('innovativeTransportation')}>Research</button>
        )}
      </li>
    </ul>
  </TechnologyTreeContainer>
);

TechnologyTree.propTypes = {
  technologies: PropTypes.object.isRequired,
  onResearch: PropTypes.func.isRequired,
};

export default TechnologyTree;
