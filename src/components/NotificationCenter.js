// NotificationCenter.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  NotificationContainer,
  NotificationItem,
  NotificationMessage,
  NotificationTimestamp,
  NotificationIcon,
} from './styles'; // Assuming you'll add these to styles.js

const NotificationCenter = ({ notifications }) => {
  return (
    <NotificationContainer>
      <h2>Notifications</h2>
      {notifications && notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationItem key={notification.id} type={notification.type}>
            {notification.icon && <NotificationIcon>{notification.icon}</NotificationIcon>}
            <NotificationMessage>{notification.message}</NotificationMessage>
            <NotificationTimestamp>{new Date(notification.timestamp).toLocaleTimeString()}</NotificationTimestamp>
          </NotificationItem>
        ))
      ) : (
        <p>No new notifications.</p>
      )}
    </NotificationContainer>
  );
};

NotificationCenter.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['info', 'warning', 'success', 'error']).isRequired,
      timestamp: PropTypes.number.isRequired, // Unix timestamp
      icon: PropTypes.string, // Optional icon (e.g., emoji)
    })
  ).isRequired,
};

NotificationCenter.defaultProps = {
  notifications: [],
};

export default NotificationCenter;