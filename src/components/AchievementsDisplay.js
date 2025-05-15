// AchievementsDisplay.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  AchievementsContainer,
  AchievementItem,
  AchievementTitle,
  AchievementDescription,
  ProgressContainer,
  ProgressBar,
  ProgressText,
  LockedOverlay,
} from './styles'; // Assuming you'll add these to styles.js

const AchievementsDisplay = ({ achievements }) => {
  return (
    <AchievementsContainer>
      <h2>Achievements & Milestones</h2>
      {achievements &&
        achievements.map((achievement) => (
          <AchievementItem key={achievement.id} isUnlocked={achievement.isUnlocked}>
            <AchievementTitle>{achievement.title}</AchievementTitle>
            <AchievementDescription>{achievement.description}</AchievementDescription>
            {achievement.progress !== undefined && !achievement.isUnlocked && (
              <ProgressContainer>
                <ProgressBar progress={achievement.progress} />
                <ProgressText>{achievement.progress}%</ProgressText>
              </ProgressContainer>
            )}
            {!achievement.isUnlocked && <LockedOverlay>Locked</LockedOverlay>}
          </AchievementItem>
        ))}
      {!achievements || achievements.length === 0 ? (
        <p>No achievements available yet.</p>
      ) : null}
    </AchievementsContainer>
  );
};

AchievementsDisplay.propTypes = {
  achievements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      isUnlocked: PropTypes.bool.isRequired,
      progress: PropTypes.number, // Optional progress percentage (0-100)
    })
  ).isRequired,
};

AchievementsDisplay.defaultProps = {
  achievements: [],
};

export default AchievementsDisplay;