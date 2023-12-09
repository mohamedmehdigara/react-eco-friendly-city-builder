// TechnologyTree.js
import React from 'react';
import PropTypes from 'prop-types';
import { TechnologyTreeContainer } from '../styles';

const TechnologyTree = ({ technologies, onResearch }) => (
  <TechnologyTreeContainer>
    <h2>Technology Tree</h2>
    <ul>
      <li>
        <strong>Cleaner Energy</strong>
        {!technologies.cleanerEnergy && (
          <button onClick={() => onResearch('cleanerEnergy')}>Research</button>
        )}
        {technologies.cleanerEnergy && (
          <span className="technology-status">Researched - Cleaner energy sources are available.</span>
        )}
        {/* Add a description or additional information */}
      </li>
      <li>
        <strong>Advanced Waste Management</strong>
        {!technologies.advancedWasteManagement && (
          <button onClick={() => onResearch('advancedWasteManagement')}>Research</button>
        )}
        {technologies.advancedWasteManagement && (
          <span className="technology-status">Researched - Improved waste management implemented.</span>
        )}
        {/* Add a description or additional information */}
      </li>
      <li>
        <strong>Innovative Transportation</strong>
        {!technologies.innovativeTransportation && (
          <button onClick={() => onResearch('innovativeTransportation')}>Research</button>
        )}
        {technologies.innovativeTransportation && (
          <span className="technology-status">Researched - Modern transportation methods adopted.</span>
        )}
        {/* Add a description or additional information */}
      </li>
      <li>
        <strong>Sustainable Agriculture</strong>
        {!technologies.sustainableAgriculture && (
          <button onClick={() => onResearch('sustainableAgriculture')}>Research</button>
        )}
        {technologies.sustainableAgriculture && (
          <span className="technology-status">Researched - Sustainable farming practices implemented.</span>
        )}
        {/* Add a description or additional information */}
      </li>
      <li>
        <strong>Renewable Materials</strong>
        {!technologies.renewableMaterials && (
          <button onClick={() => onResearch('renewableMaterials')}>Research</button>
        )}
        {technologies.renewableMaterials && (
          <span className="technology-status">Researched - Use of renewable materials in construction.</span>
        )}
        {/* Add a description or additional information */}
      </li>
      {/* Add more technologies as needed */}
    </ul>
  </TechnologyTreeContainer>
);

TechnologyTree.propTypes = {
  technologies: PropTypes.object.isRequired,
  onResearch: PropTypes.func.isRequired,
};

export default TechnologyTree;
