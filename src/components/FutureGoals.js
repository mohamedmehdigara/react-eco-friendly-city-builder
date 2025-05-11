// FutureGoals.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  GoalsContainer,
  GoalItem,
  GoalTitle,
  GoalDescription,
  TargetValue,
  Timeline,
} from './styles'; // Assuming you'll add these to styles.js

const FutureGoals = ({ goals }) => {
  return (
    <GoalsContainer>
      <h2>Future Sustainability Goals</h2>
      {goals &&
        goals.map((goal) => (
          <GoalItem key={goal.id}>
            <GoalTitle>{goal.title}</GoalTitle>
            <GoalDescription>{goal.description}</GoalDescription>
            {goal.targetValue && <TargetValue>Target: {goal.targetValue}</TargetValue>}
            {goal.timeline && <Timeline>Timeline: {goal.timeline}</Timeline>}
          </GoalItem>
        ))}
      {goals && goals.length === 0 && <p>No future sustainability goals currently defined.</p>}
    </GoalsContainer>
  );
};

FutureGoals.propTypes = {
  goals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      targetValue: PropTypes.string,
      timeline: PropTypes.string,
    })
  ).isRequired,
};

FutureGoals.defaultProps = {
  goals: [],
};

export default FutureGoals;