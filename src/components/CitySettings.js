// CitySettings.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SettingsContainer,
  SettingItem,
  SettingLabel,
  TextInput,
  SelectInput,
  SaveButton,
} from './styles'; // Assuming you'll add these to styles.js

const CitySettings = ({ currentSettings, onSettingsChange }) => {
  const [cityName, setCityName] = useState(currentSettings.cityName || '');
  const [unitPreference, setUnitPreference] = useState(currentSettings.unitPreference || 'metric');

  const handleCityNameChange = (event) => {
    setCityName(event.target.value);
  };

  const handleUnitPreferenceChange = (event) => {
    setUnitPreference(event.target.value);
  };

  const handleSaveSettings = () => {
    onSettingsChange({ cityName, unitPreference });
  };

  return (
    <SettingsContainer>
      <h2>City Settings</h2>

      <SettingItem>
        <SettingLabel htmlFor="cityName">City Name:</SettingLabel>
        <TextInput
          type="text"
          id="cityName"
          value={cityName}
          onChange={handleCityNameChange}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel htmlFor="unitPreference">Units:</SettingLabel>
        <SelectInput
          id="unitPreference"
          value={unitPreference}
          onChange={handleUnitPreferenceChange}
        >
          <option value="metric">Metric (°C, km/h)</option>
          <option value="imperial">Imperial (°F, mph)</option>
        </SelectInput>
      </SettingItem>

      <SaveButton onClick={handleSaveSettings}>Save Settings</SaveButton>
    </SettingsContainer>
  );
};

CitySettings.propTypes = {
  currentSettings: PropTypes.shape({
    cityName: PropTypes.string,
    unitPreference: PropTypes.oneOf(['metric', 'imperial']),
  }).isRequired,
  onSettingsChange: PropTypes.func.isRequired,
};

export default CitySettings;