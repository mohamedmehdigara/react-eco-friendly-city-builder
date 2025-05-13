// City.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Building from './Building';
import EducationCenter from './EducationCenter';
import RandomEvent from './RandomEvent';
import CityExpansion from './CityExpansion';
import CitizenInfo from './CitizenInfo'; // Import the CitizenInfo component
import { CityContainer } from '../styles';
import RenewableEnergySources from './RenewableEnergySources';
import GreenSpaces from './GreenSpaces';
import TransportationNetwork from './TransportationNetwork';
import WasteManagement from './WasteManagement';
import CityEvents from './CityEvents';
import EcoProgress from './EcoProgress';
import SmartCityTech from './SmartCityTech';
import FutureGoals from './FutureGoals';
import CitizenFeedback from './CitizenFeedback';
import CityNews from './CityNews';
import PollutionControl from './PollutionControl';
import RandomEventGenerator from './RandomEventGenerator';

const City = ({ resources, setResources, setPollutionLevel, hasEducationCenter, onBuildEducationCenter, updateScores, citizens, setCitizens }) => {
  const [buildings, setBuildings] = useState([]);
  const [randomEvent, setRandomEvent] = useState(null);
  const [playerId] = useState(1);
  const [cityZone, setCityZone] = useState(1);
  const [weather, setWeather] = useState('sunny');
   const energySourcesData = [
    { id: 1, type: 'solar', name: 'Solar Farm Alpha', production: 120 },
    { id: 2, type: 'wind', name: 'Wind Park Beta', production: 90 },
    { id: 3, type: 'hydro', name: 'River Dam Gamma', production: 150 },
  ];

   const parksData = [
    { id: 1, name: 'Central Eco-Park', size: 50, ecoFeatures: ['Solar Lighting', 'Rainwater Harvesting'] },
    { id: 2, name: 'Community Garden Oasis', size: 15, ecoFeatures: ['Composting Program', 'Native Plantings'] },
    { id: 3, name: 'Riverside Nature Preserve', size: 120 },
  ];

   const transportationData = [
    { id: 1, type: 'electric_car', name: 'Electric Vehicles', usage: 35 },
    { id: 2, type: 'bicycle', name: 'Bicycle Commuting', usage: 25 },
    { id: 3, type: 'bus', name: 'Electric Bus Network', usage: 30 },
    { id: 4, type: 'train', name: 'Light Rail System', usage: 10 },
  ];

   const cityWasteData = [
    { id: 1, type: 'municipal', name: 'General Waste', collectionMethod: 'Curbside Pickup (Weekly)', recyclingRate: 15 },
    { id: 2, type: 'recyclable', name: 'Recyclable Materials', collectionMethod: 'Separate Bins (Bi-Weekly)', recyclingRate: 65 },
    { id: 3, type: 'organic', name: 'Organic Waste', collectionMethod: 'Compost Collection (Monthly)', recyclingRate: 30 },
  ];

  const cityEventsData = [
    {
      id: 1,
      title: 'Annual Green City Festival',
      date: '2025-06-15',
      description: 'Join us for a day of eco-friendly activities, workshops, and local vendors!',
    },
    {
      id: 2,
      title: 'Community Clean-Up Drive - Riverside Park',
      date: '2025-05-25',
      description: 'Help us keep our parks clean and beautiful. All volunteers welcome!',
      registrationLink: 'https://example.com/clean-up-register',
    },
    {
      id: 3,
      title: 'Sustainable Living Workshop',
      date: '2025-07-10',
      description: 'Learn practical tips for sustainable living in an urban environment.',
    },
  ];

   const cityProgressData = [
    { id: 1, label: 'Renewable Energy', value: 65, unit: '%', target: 100 },
    { id: 2, label: 'Carbon Footprint Reduction', value: 30, unit: '%', target: 50 },
    { id: 3, label: 'Recycling Rate', value: 70, unit: '%', target: 85 },
    { id: 4, label: 'Green Space Coverage', value: 25, unit: '%', target: 30 },
    { id: 5, label: 'Air Quality Index', value: 45, unit: '', target: 50 }, // Lower is better, so target is a max
  ];

  const cityTechData = [
    { id: 1, name: 'Smart Grid System', description: 'Optimizes energy distribution and reduces waste.', isOperational: true },
    { id: 2, name: 'Environmental Sensor Network', description: 'Monitors air and water quality in real-time.', isOperational: true },
    { id: 3, name: 'AI-Powered Traffic Management', description: 'Reduces congestion and optimizes flow.', isOperational: false },
    { id: 4, name: 'Sustainable Building Automation', description: 'Intelligent systems for energy and water efficiency in buildings.', isOperational: true },
  ];

const cityFutureGoals = [
    {
      id: 1,
      title: 'Achieve Carbon Neutrality',
      description: 'Our city aims to eliminate net carbon emissions.',
      targetValue: 'Net Zero Emissions',
      timeline: 'By 2050',
    },
    {
      id: 2,
      title: '100% Renewable Energy',
      description: 'Transition to entirely renewable energy sources for all city power needs.',
      targetValue: '100% Renewable Energy',
      timeline: 'By 2040',
    },
    {
      id: 3,
      title: 'Increase Green Space Coverage',
      description: 'Expand parks and green areas within the city limits.',
      targetValue: '35% Green Space',
      timeline: 'By 2030',
    },
    {
      id: 4,
      title: 'Zero Waste City',
      description: 'Minimize waste generation and maximize recycling and composting.',
      targetValue: '90% Diversion Rate',
      timeline: 'Ongoing',
    },
  ];

   const [cityFeedback, setCityFeedback] = useState([
    { id: 1, name: 'Alice', text: 'More bike lanes needed on Elm Street!', timestamp: Date.now() - 86400000 },
    { id: 2, name: 'Bob', text: 'Love the new community gardens.', timestamp: Date.now() - 3600000 },
  ]);

  

  const cityNewsData = [
    {
      id: 1,
      title: 'New Solar Farm Project Approved',
      publishDate: Date.now() - 86400000 * 2, // Two days ago
      summary: 'The city council has approved the construction of a new large-scale solar farm...',
      link: 'https://example.com/solar-farm-news',
    },
    {
      id: 2,
      title: 'Community Recycling Program Expansion',
      publishDate: Date.now() - 3600000 * 12, // Twelve hours ago
      summary: 'The city is expanding its community recycling program to include more materials...',
    },
    {
      id: 3,
      title: 'Green Transportation Initiative Update',
      publishDate: Date.now() - 3600000 * 24 * 7, // One week ago
      summary: 'Progress on the electric bus fleet and new bike lanes is on schedule...',
    },
  ];

  const cityPollutantsData = [
    {
      id: 1,
      name: 'PM2.5',
      currentLevel: 15,
      unit: 'µg/m³',
      targetLevel: 10,
      mitigationEfforts: ['Electric Vehicle Promotion', 'Industrial Emission Filters'],
    },
    {
      id: 2,
      name: 'NOx',
      currentLevel: 40,
      unit: 'ppb',
      targetLevel: 30,
      mitigationEfforts: ['Improved Public Transport', 'Traffic Flow Optimization'],
    },
    {
      id: 3,
      name: 'Water Contaminant X',
      currentLevel: 0.5,
      unit: 'ppm',
      targetLevel: 0.2,
      mitigationEfforts: ['Water Treatment Plant Upgrade'],
    },
  ];


   const [cityState, setCityState] = useState({
    citizenHappiness: 80,
    budget: 5000,
    energyConsumption: 1000,
    pollutionLevel: 30,
    recycledMaterials: 200,
    // ... other city state properties
  });
  const [eventMessage, setEventMessage] = useState('');

  useEffect(() => {
    const gameTickInterval = setInterval(() => {
      RandomEventGenerator(cityState, handleCityEvent);
    }, 5000); // Trigger a random event check every 5 seconds (adjust as needed)

    return () => clearInterval(gameTickInterval); // Cleanup on unmount
  }, [cityState]); // Re-run effect if cityState changes (though the generator itself doesn't modify it directly here)

  const handleCityEvent = (message, newState) => {
    setCityState(newState);
    setEventMessage(message);
    // Optionally display the eventMessage to the user via UI
    console.log('Event:', message);
  };



  const addBuilding = () => {
    const newBuilding = {
      id: buildings.length + 1,
      type: generateRandomBuildingType(),
      ecoLevel: 1,
    };
    setBuildings([...buildings, newBuilding]);
  };

  const upgradeBuilding = (id) => {
    setBuildings((prevBuildings) =>
      prevBuildings.map((building) =>
        building.id === id ? { ...building, ecoLevel: building.ecoLevel + 1 } : building
      )
    );
  };

  const handleRandomEvent = () => {
    const events = [
      { description: 'Sudden increase in pollution!', impact: 'negative', action: handlePollutionIncrease },
      { description: 'Grant for renewable energy projects!', impact: 'positive', action: handleGrantForRenewableEnergy },
    ];
    const selectedEvent = events[Math.floor(Math.random() * events.length)];

    setRandomEvent(selectedEvent);
    selectedEvent.action();
  };

  const handlePollutionIncrease = () => {
    setPollutionLevel((prevLevel) => prevLevel + 20);
  };

  const handleGrantForRenewableEnergy = () => {
    setResources((prevResources) => ({ ...prevResources, money: prevResources.money + 1000 }));
  };

  const handleCloseRandomEvent = () => {
    setRandomEvent(null);
  };

  const generateRandomBuildingType = () => {
    const buildingTypes = ['residential', 'commercial', 'industrial'];
    const randomIndex = Math.floor(Math.random() * buildingTypes.length);
    return buildingTypes[randomIndex];
  };

  const handleGameOver = () => {
    updateScores(playerId, resources.money);
  };

  const handleWeatherImpact = () => {
    if (weather === 'sunny') {
      setResources((prevResources) => ({
        ...prevResources,
        energy: prevResources.energy + 10,
      }));
      setPollutionLevel((prevLevel) => prevLevel - 5);
    } else if (weather === 'rainy') {
      setResources((prevResources) => ({
        ...prevResources,
        energy: prevResources.energy - 5,
      }));
      setPollutionLevel((prevLevel) => prevLevel + 5);
    }
  };

  useEffect(() => {
    handleWeatherImpact();
  }, [weather]);

  const handleRandomWeatherEvent = () => {
    const weatherOptions = ['sunny', 'rainy', 'cloudy'];
    const randomWeather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
    setWeather(randomWeather);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleRandomWeatherEvent();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleCityExpansion = () => {
    setCityZone((prevZone) => prevZone + 1);
  };

  const handleAddCityFeedback = (newFeedback) => {
    setCityFeedback([...cityFeedback, { id: Date.now(), ...newFeedback, timestamp: Date.now() }]);
    // In a real application, you would likely send this data to a server
  };


  return (
    <CityContainer>
      <button onClick={addBuilding}>Build Eco-Friendly Building</button>
      <button onClick={handleRandomEvent}>Trigger Random Event</button>
      <div>
        {buildings.map((building) => (
          <Building key={building.id} type={building.type} ecoLevel={building.ecoLevel} onUpgrade={() => upgradeBuilding(building.id)} />
        ))}
      </div>
      {hasEducationCenter && <EducationCenter onBuildEducationCenter={onBuildEducationCenter} onUpgrade={upgradeBuilding} />}
      {randomEvent && <RandomEvent event={randomEvent} onClose={handleCloseRandomEvent} />}
      <CityExpansion currentCityZone={cityZone} onCityExpansion={handleCityExpansion} />
      <CitizenInfo citizens={citizens} />
            <RenewableEnergySources sources={energySourcesData} />
                  <GreenSpaces parks={parksData} />
                        <TransportationNetwork modes={transportationData} />

      <WasteManagement wasteData={cityWasteData} />
            <CityEvents events={cityEventsData} />
                  <EcoProgress progressData={cityProgressData} />
                        <SmartCityTech technologies={cityTechData} />
                              <FutureGoals goals={cityFutureGoals} />
                                    <CitizenFeedback feedbackItems={cityFeedback} onAddFeedback={handleAddCityFeedback} />
      <CityNews newsItems={cityNewsData} />
            <PollutionControl pollutants={cityPollutantsData} />



{eventMessage && <p>{eventMessage}</p>}




    </CityContainer>
  );
};

City.propTypes = {
  resources: PropTypes.object.isRequired,
  setResources: PropTypes.func.isRequired,
  setPollutionLevel: PropTypes.func.isRequired,
  hasEducationCenter: PropTypes.bool.isRequired,
  updateScores: PropTypes.func.isRequired,
  weather: PropTypes.string.isRequired,
  setWeather: PropTypes.func.isRequired,

  citizens: PropTypes.array.isRequired,
  setCitizens: PropTypes.func.isRequired,
};

export default City;
