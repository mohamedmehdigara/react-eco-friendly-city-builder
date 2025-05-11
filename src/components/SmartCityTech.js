// SmartCityTech.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  TechContainer,
  TechItem,
  TechTitle,
  TechDescription,
  StatusIndicator,
} from './styles'; // Assuming you'll add these to styles.js

const SmartCityTech = ({ technologies }) => {
  return (
    <TechContainer>
      <h2>Smart City Technologies</h2>
      {technologies &&
        technologies.map((tech) => (
          <TechItem key={tech.id}>
            <TechTitle>{tech.name}</TechTitle>
            <TechDescription>{tech.description}</TechDescription>
            <StatusIndicator isOperational={tech.isOperational}>
              {tech.isOperational ? 'Operational' : 'Under Development'}
            </StatusIndicator>
          </TechItem>
        ))}
      {technologies && technologies.length === 0 && (
        <p>No smart city technologies currently implemented.</p>
      )}
    </TechContainer>
  );
};

SmartCityTech.propTypes = {
  technologies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      isOperational: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

SmartCityTech.defaultProps = {
  technologies: [],
};

export default SmartCityTech;