// HelpSection.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  HelpContainer,
  SectionTitle,
  TopicItem,
  TopicTitle,
  TopicContent,
} from './styles'; // Assuming you'll add these to styles.js

const HelpSection = ({ topics }) => {
  const [expandedTopic, setExpandedTopic] = useState(null);

  const toggleTopic = (topicId) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  return (
    <HelpContainer>
      <SectionTitle>Help & Tutorials</SectionTitle>
      {topics &&
        topics.map((topic) => (
          <TopicItem key={topic.id}>
            <TopicTitle onClick={() => toggleTopic(topic.id)}>
              {topic.title}
              <span>{expandedTopic === topic.id ? '▲' : '▼'}</span>
            </TopicTitle>
            {expandedTopic === topic.id && (
              <TopicContent>{topic.content}</TopicContent>
            )}
          </TopicItem>
        ))}
      {topics && topics.length === 0 && <p>No help topics available yet.</p>}
    </HelpContainer>
  );
};

HelpSection.propTypes = {
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};

HelpSection.defaultProps = {
  topics: [],
};

export default HelpSection;