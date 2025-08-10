// Example in a component where user info is available
import React from 'react';
import UserProfile from './UserProfile';

const Dashboard = () => {
  const currentUser = {
    username: 'EcoCitizen123',
    settings: {
      theme: 'light',
      notifications: 'enabled',
      preferredUnit: 'metric',
    },
  };

  return (
    <div>
      <h1>Welcome to your Eco-City Dashboard</h1>
      <UserProfile
        username={currentUser.username}
        preferences={currentUser.settings}
      />
      {/* Other dashboard content */}
    </div>
  );
};

export default Dashboard;