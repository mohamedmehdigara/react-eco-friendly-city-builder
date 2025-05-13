// UserProfile.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  ProfileContainer,
  Avatar,
  Username,
  UserInfo,
  PreferenceSection,
  PreferenceItem,
  PreferenceLabel,
  PreferenceValue,
} from './styles'; // Assuming you'll add these to styles.js

const UserProfile = ({ username, avatarSrc, preferences }) => {
  return (
    <ProfileContainer>
      <Avatar src={avatarSrc} alt={`${username}'s Avatar`} />
      <Username>{username}</Username>

      <UserInfo>
        {/* You can add more general user info here */}
      </UserInfo>

      {preferences && Object.keys(preferences).length > 0 && (
        <PreferenceSection>
          <h3>Preferences</h3>
          {Object.entries(preferences).map(([key, value]) => (
            <PreferenceItem key={key}>
              <PreferenceLabel>{key}:</PreferenceLabel>
              <PreferenceValue>{value}</PreferenceValue>
            </PreferenceItem>
          ))}
        </PreferenceSection>
      )}
    </ProfileContainer>
  );
};

UserProfile.propTypes = {
  username: PropTypes.string.isRequired,
  avatarSrc: PropTypes.string,
  preferences: PropTypes.object, // Object of key-value pairs
};

UserProfile.defaultProps = {
  avatarSrc: null,
  preferences: {},
};

export default UserProfile;