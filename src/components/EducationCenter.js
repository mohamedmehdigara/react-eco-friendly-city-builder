// EducationCenter.js
import React from 'react';
import PropTypes from 'prop-types';
import { EducationCenterContainer } from '../styles';

const EducationCenter = ({ onBuildEducationCenter }) => (
  <EducationCenterContainer>
    <h2>Education Center</h2>
    <button onClick={onBuildEducationCenter}>Build Education Center</button>
  </EducationCenterContainer>
);

EducationCenter.propTypes = {
  onBuildEducationCenter: PropTypes.func.isRequired,
};

export default EducationCenter;
