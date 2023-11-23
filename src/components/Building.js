import React from 'react';
import PropTypes from 'prop-types';
import { BuildingContainer } from '../styles';

const Building = ({ type }) => (
  <BuildingContainer type={type}>
    <p>{type.charAt(0).toUpperCase() + type.slice(1)} Building</p>
  </BuildingContainer>
);

Building.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Building;
