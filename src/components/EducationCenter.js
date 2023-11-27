import React from 'react';
import PropTypes from 'prop-types';
import { EducationCenterContainer } from '../styles';

const EducationCenter = ({ onBuildEducationCenter }) => (
  <EducationCenterContainer>
    <h2>Education Center</h2>
    <p>Build an Education Center to raise awareness and boost eco-friendliness!</p>
    <button onClick={onBuildEducationCenter}>
      <span role="img" aria-label="School">
        🏫
      </span>{' '}
      Build Education Center
    </button>
  </EducationCenterContainer>
);

EducationCenter.propTypes = {
  onBuildEducationCenter: PropTypes.func.isRequired,
};

export default EducationCenter;
