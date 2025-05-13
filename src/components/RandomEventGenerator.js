// RandomEventGenerator.js

const events = [
  {
    id: 'sudden-heatwave',
    probability: 0.1, // 10% chance
    effect: (cityState) => {
      console.log('A sudden heatwave hits the city!');
      return { ...cityState, citizenHappiness: cityState.citizenHappiness - 5, energyConsumption: cityState.energyConsumption + 10 };
    },
    message: 'A sudden heatwave is affecting citizen happiness and energy consumption.',
  },
  {
    id: 'unexpected-windfall',
    probability: 0.05, // 5% chance
    effect: (cityState) => {
      console.log('An unexpected environmental grant!');
      return { ...cityState, budget: cityState.budget + 1000 };
    },
    message: 'The city has received an unexpected environmental grant!',
  },
  {
    id: 'minor-pollution-incident',
    probability: 0.15, // 15% chance
    effect: (cityState) => {
      console.log('A minor pollution incident occurred.');
      return { ...cityState, pollutionLevel: cityState.pollutionLevel + 2 };
    },
    message: 'A minor pollution incident has slightly increased pollution levels.',
  },
  {
    id: 'successful-recycling-drive',
    probability: 0.2, // 20% chance
    effect: (cityState) => {
      console.log('A successful recycling drive!');
      return { ...cityState, recycledMaterials: cityState.recycledMaterials + 50 };
    },
    message: 'A recent recycling drive has significantly increased recycled materials.',
  },
  // Add more events with varying probabilities and effects
];

const RandomEventGenerator = (cityState, onEvent) => {
  const randomNumber = Math.random();
  let cumulativeProbability = 0;

  for (const event of events) {
    cumulativeProbability += event.probability;
    if (randomNumber < cumulativeProbability) {
      const newState = event.effect(cityState);
      onEvent(event.message, newState); // Notify the parent component about the event and the new state
      return; // Trigger only one event per tick
    }
  }
};

export default RandomEventGenerator;