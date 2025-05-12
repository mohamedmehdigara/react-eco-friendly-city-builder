// CitizenFeedback.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FeedbackContainer,
  FeedbackForm,
  Input,
  TextArea,
  SubmitButton,
  FeedbackList,
  FeedbackItem,
  FeedbackText,
  Timestamp,
} from './styles'; // Assuming you'll add these to styles.js

const CitizenFeedback = ({ feedbackItems, onAddFeedback }) => {
  const [name, setName] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (suggestion.trim()) {
      onAddFeedback({ name: name || 'Anonymous', text: suggestion });
      setName('');
      setSuggestion('');
    }
  };

  return (
    <FeedbackContainer>
      <h2>Citizen Feedback & Suggestions</h2>

      <FeedbackForm onSubmit={handleSubmit}>
        <h3>Share Your Ideas</h3>
        <Input
          type="text"
          placeholder="Your Name (Optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextArea
          placeholder="Your Suggestion or Feedback"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
        />
        <SubmitButton type="submit">Submit Feedback</SubmitButton>
      </FeedbackForm>

      {feedbackItems && feedbackItems.length > 0 && (
        <FeedbackList>
          <h3>Recent Feedback</h3>
          {feedbackItems.map((item) => (
            <FeedbackItem key={item.id}>
              <FeedbackText>
                <strong>{item.name}:</strong> {item.text}
              </FeedbackText>
              <Timestamp>{new Date(item.timestamp).toLocaleString()}</Timestamp>
            </FeedbackItem>
          ))}
        </FeedbackList>
      )}

      {feedbackItems && feedbackItems.length === 0 && (
        <p>No citizen feedback submitted yet. Be the first!</p>
      )}
    </FeedbackContainer>
  );
};

CitizenFeedback.propTypes = {
  feedbackItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      text: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
    })
  ).isRequired,
  onAddFeedback: PropTypes.func.isRequired,
};

CitizenFeedback.defaultProps = {
  feedbackItems: [],
};

export default CitizenFeedback;