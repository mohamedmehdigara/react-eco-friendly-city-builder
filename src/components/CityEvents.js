// CityEvents.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  EventsContainer,
  EventItem,
  EventTitle,
  EventDate,
  EventDescription,
  ActionButton,
} from './styles'; // Assuming you'll add these to styles.js

const CityEvents = ({ events }) => {
  return (
    <EventsContainer>
      <h2>City Events & Community Engagement</h2>
      {events &&
        events.map((event) => (
          <EventItem key={event.id}>
            <EventTitle>{event.title}</EventTitle>
            <EventDate>{event.date}</EventDate>
            <EventDescription>{event.description}</EventDescription>
            {event.registrationLink && (
              <ActionButton onClick={() => window.open(event.registrationLink, '_blank')}>
                Register Now
              </ActionButton>
            )}
          </EventItem>
        ))}
      {events && events.length === 0 && <p>No upcoming city events.</p>}
    </EventsContainer>
  );
};

CityEvents.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      registrationLink: PropTypes.string,
    })
  ).isRequired,
};

CityEvents.defaultProps = {
  events: [],
};

export default CityEvents;