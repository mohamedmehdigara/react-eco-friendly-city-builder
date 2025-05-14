// Example in a component (e.g., a dedicated HelpPage or within the main City view)
import React from 'react';
import HelpSection from './HelpSection';

const HelpPage = () => {
  const helpTopicsData = [
    {
      id: 1,
      title: 'Getting Started',
      content: `Welcome to Eco-topia! Your goal is to build a sustainable and thriving city. Here are some initial steps:\n\n- Start by building a residential zone to attract citizens.\n- Then, establish a power source, like a solar farm, to provide energy.\n- Don't forget essential services like water and waste management.`,
    },
    {
      id: 2,
      title: 'Managing Pollution',
      content: `Pollution can negatively impact citizen happiness. Here's how to manage it:\n\n- Invest in clean energy sources to reduce air pollution.\n- Implement effective waste management and recycling programs.\n- Create green spaces like parks to absorb pollutants.`,
    },
    {
      id: 3,
      title: 'Citizen Happiness',
      content: `Happy citizens are productive citizens! Keep their needs in mind:\n\n- Ensure access to essential services.\n- Provide recreational areas and green spaces.\n- Keep pollution levels low.\n- Respond to their feedback and concerns.`,
    },
    // Add more help topics
  ];

  return (
    <div>
      <h1>City Help</h1>
      <HelpSection topics={helpTopicsData} />
    </div>
  );
};

export default HelpPage;