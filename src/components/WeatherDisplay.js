// WeatherDisplay.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  WeatherContainer,
  Temperature,
  Conditions,
  Icon,
  Details,
  DetailItem,
} from './styles';

const generateRandomWeather = () => {
  const temperatures = Array.from({ length: 30 }, (_, i) => i + 15); // 15-44 Celsius
  const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Stormy', 'Foggy'];
  const humidities = Array.from({ length: 60 }, (_, i) => i + 40); // 40-99%
  const windSpeeds = Array.from({ length: 20 }, (_, i) => i); // 0-19 km/h

  return {
    temperature: temperatures[Math.floor(Math.random() * temperatures.length)],
    conditions: conditions[Math.floor(Math.random() * conditions.length)],
    humidity: humidities[Math.floor(Math.random() * humidities.length)],
    windSpeed: windSpeeds[Math.floor(Math.random() * windSpeeds.length)],
  };
};

const WeatherDisplay = ({ city }) => {
  const [weather, setWeather] = useState(generateRandomWeather());

  const handleRandomWeatherEvent = () => {
    const newWeather = generateRandomWeather();
    setWeather(newWeather);
  };

  const getWeatherIcon = (conditions) => {
    switch (conditions.toLowerCase()) {
      case 'sunny':
        return '☀️';
      case 'cloudy':
        return '☁️';
      case 'rainy':
        return '🌧️';
      case 'partly cloudy':
        return '🌤️';
      case 'stormy':
        return '⛈️';
      case 'foggy':
        return '🌫️';
      default:
        return '❓';
    }
  };

  return (
    <WeatherContainer>
      <h2>Weather in {city}</h2>
      <Temperature>{weather.temperature}°C</Temperature>
      <Conditions>
        <Icon>{getWeatherIcon(weather.conditions)}</Icon>
        {weather.conditions}
      </Conditions>
      <Details>
        <DetailItem>Humidity: {weather.humidity}%</DetailItem>
        <DetailItem>Wind: {weather.windSpeed} km/h</DetailItem>
      </Details>
     
    </WeatherContainer>
  );
};

WeatherDisplay.propTypes = {
  city: PropTypes.string.isRequired,
};

export default WeatherDisplay;