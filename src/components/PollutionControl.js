// PollutionControl.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  ControlContainer,
  PollutantItem,
  PollutantName,
  CurrentLevel,
  TargetLevel,
  MitigationEfforts,
  EffortTag,
} from './styles'; // Assuming you'll add these to styles.js

const PollutionControl = ({ pollutants }) => {
  return (
    <ControlContainer>
      <h2>Pollution Control & Mitigation</h2>
      {pollutants &&
        pollutants.map((pollutant) => (
          <PollutantItem key={pollutant.id}>
            <PollutantName>{pollutant.name}</PollutantName>
            <CurrentLevel>Current Level: {pollutant.currentLevel} {pollutant.unit}</CurrentLevel>
            {pollutant.targetLevel && (
              <TargetLevel>Target Level: {pollutant.targetLevel} {pollutant.unit}</TargetLevel>
            )}
            {pollutant.mitigationEfforts && pollutant.mitigationEfforts.length > 0 && (
              <div>
                <MitigationEfforts>Mitigation Efforts:</MitigationEfforts>
                {pollutant.mitigationEfforts.map((effort, index) => (
                  <EffortTag key={index}>{effort}</EffortTag>
                ))}
              </div>
            )}
          </PollutantItem>
        ))}
      {pollutants && pollutants.length === 0 && <p>No pollution data available.</p>}
    </ControlContainer>
  );
};

PollutionControl.propTypes = {
  pollutants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      currentLevel: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired,
      targetLevel: PropTypes.number,
      mitigationEfforts: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

PollutionControl.defaultProps = {
  pollutants: [],
};

export default PollutionControl;