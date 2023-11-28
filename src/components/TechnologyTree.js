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
        {!technologies.cleanerEnergy && (
          <button onClick={() => onResearch('cleanerEnergy')}>Research</button>
        )}
        {technologies.cleanerEnergy && <span className="technology-status">Researched</span>}
        {/* Add a description or additional information */}
      </li>
      <li>
        Advanced Waste Management
        {!technologies.advancedWasteManagement && (
          <button onClick={() => onResearch('advancedWasteManagement')}>Research</button>
        )}
        {technologies.advancedWasteManagement && <span className="technology-status">Researched</span>}
        {/* Add a description or additional information */}
      </li>
      <li>
        Innovative Transportation
        {!technologies.innovativeTransportation && (
          <button onClick={() => onResearch('innovativeTransportation')}>Research</button>
        )}
        {technologies.innovativeTransportation && <span className="technology-status">Researched</span>}
        {/* Add a description or additional information */}
      </li>
    </ul>
  </TechnologyTreeContainer>
);

TechnologyTree.propTypes = {
  technologies: PropTypes.object.isRequired,
  onResearch: PropTypes.func.isRequired,
};

export default TechnologyTree;
