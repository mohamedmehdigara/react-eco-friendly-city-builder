import styled from 'styled-components';

export const BuildingContainer = styled.div`
  background-color: ${(props) => (props.color ? props.color : '#ddd')};
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  display: flex; /* Allow for horizontal layout of content */
  flex-direction: column; /* Stack content vertically by default */
  align-items: center; /* Center content horizontally */
  width: 200px; /* Adjust width as needed */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow effect */
`;

export const BuildingDetails = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

export const UpgradeButton = styled.button`
  background-color: #4CAF50; /* Green for upgrade */
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer; /* Indicate clickable button */
  margin-top: 10px;
`;


export const BuildingLabel = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
`;

export const ResidentIcon = styled.span`
  /* Style for resident icon (e.g., using SVG or icon library) */
  margin-right: 5px;
`;

export const EcoLevelIcon = styled.span`
  /* Style for eco level icon (e.g., using SVG or icon library) */
  margin-right: 5px;
`;

export const BuildingInfo = styled.div`
  background-color: #f2f2f2;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px; /* Add spacing after toggle button */
  display: none; /* Initially hidden */
`;

export const ChallengeList = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
`;

export const ChallengeItem = styled.li`
  display: flex; /* Allow horizontal layout for description and buttons */
  justify-content: space-between; /* Space out content horizontally */
  align-items: center; /* Align content vertically */
  padding: 5px 10px;
  margin-bottom: 5px;
  border-bottom: 1px dashed #ddd; /* Optional visual separation */
  cursor: pointer; /* Indicate clickable challenge item */
`;

export const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  color: #333;
  padding: 5px;
  cursor: pointer; /* Indicate clickable button */

  &:hover {
    text-decoration: underline; /* Subtle hover effect */
  }
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #990000; /* Red for delete */
  padding: 5px;
  cursor: pointer; /* Indicate clickable button */

  &:hover {
    text-decoration: underline; /* Subtle hover effect */
  }
`;

export const NewChallengeInput = styled.div`
  display: flex; /* Arrange input and button horizontally */
  margin-top: 10px;
`;

export const AddChallengeButton = styled.button`
  background-color: #4CAF50; /* Green for add */
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer; /* Indicate clickable button */
`;

export const CitizenInfoContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
`;

export const CitizenItem = styled.div`
  margin-bottom: 5px;
`;



// Existing styles for other components...

export const RenewableEnergyContainer = styled.div`
  border: 1px solid #aed581; /* Light green/yellow border */
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #f1f8e9; /* Very light green background */
`;

export const EnergySourceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

export const EnergyProduction = styled.span`
  font-size: 14px;
  color: #757575;
`;

export const Icon = styled.span`
  margin-right: 8px;
  font-size: 1.2em;
`;



// Existing styles for other components...

export const GreenSpacesContainer = styled.div`
  border: 1px solid #8bc34a; /* Green border */
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #f1f8e9; /* Very light green background */
`;

export const ParkItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

export const ParkName = styled.h3`
  margin-bottom: 5px;
  color: #388e3c; /* Darker green */
  font-size: 1.1em;
`;

export const ParkDetails = styled.p`
  font-size: 14px;
  color: #757575;
  margin-bottom: 3px;
`;

export const FeatureTag = styled.span`
  background-color: #c8e6c9; /* Light green background for tags */
  color: #388e3c; /* Darker green text for tags */
  font-size: 0.9em;
  padding: 3px 8px;
  border-radius: 15px;
  margin-right: 5px;
  margin-bottom: 5px;
  display: inline-block;
`;



// Existing styles for other components...

export const TransportationContainer = styled.div`
  border: 1px solid #64b5f6; /* Light blue border */
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #e3f2fd; /* Very light blue background */
`;

export const TransportModeItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

export const ModeName = styled.span`
  font-weight: bold;
  color: #1e88e5; /* Blue */
`;

export const UsageInfo = styled.span`
  font-size: 14px;
  color: #757575;
`;




// Existing styles for other components...

export const WasteManagementContainer = styled.div`
  border: 1px solid #a1887f; /* Brownish border */
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #fbe9e7; /* Very light brown background */
`;

export const WasteTypeItem = styled.div`
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }

  span {
    font-weight: bold;
    color: #795548; /* Brown */
  }
`;

export const CollectionMethod = styled.p`
  font-size: 14px;
  color: #757575;
  margin-left: 1.5em; /* Indent a bit */
`;

export const RecyclingRate = styled.p`
  font-size: 14px;
  color: #4caf50; /* Green for positive aspect */
  margin-left: 1.5em; /* Indent a bit */
`;



// Existing styles for other components...

export const EventsContainer = styled.div`
  border: 1px solid #4db6ac; /* Teal border */
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #e0f2f1; /* Very light teal background */
`;

export const EventItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

export const EventTitle = styled.h3`
  color: #00897b; /* Teal */
  margin-bottom: 5px;
  font-size: 1.1em;
`;

export const EventDate = styled.p`
  font-size: 0.9em;
  color: #757575;
  margin-bottom: 8px;
`;

export const EventDescription = styled.p`
  font-size: 14px;
  color: #546e7a; /* Grayish blue */
  margin-bottom: 10px;
`;

export const ActionButton = styled.button`
  background-color: #00897b; /* Teal */
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;

  &:hover {
    background-color: #00695c; /* Darker teal */
  }
`;



// Existing styles for other components...

export const EcoProgressContainer = styled.div`
  border: 1px solid #66bb6a; /* Light green border */
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #e8f5e9; /* Very light green background */
`;

export const ProgressItem = styled.div`
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

export const ProgressLabel = styled.span`
  font-weight: bold;
  color: #388e3c; /* Green */
  width: 40%; /* Adjust as needed */
`;

export const ProgressValue = styled.span`
  color: #546e7a; /* Grayish blue */
  width: 30%; /* Adjust as needed */
  text-align: right;
  margin-left: 10px;
`;

export const ProgressBarContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 5px;
  height: 10px;
  width: 30%; /* Adjust as needed */
  margin-left: 10px;
  overflow: hidden; /* Hide overflow of the fill */
`;

export const ProgressBarFill = styled.div`
  background-color: #8bc34a; /* Green fill */
  height: 100%;
  border-radius: 5px;
  width: ${(props) => props.progress * 100}%; /* Dynamic width based on progress */
`;


// Existing styles for other components...

export const TechContainer = styled.div`
  border: 1px solid #7986cb; /* Indigo border */
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #e8eaf6; /* Very light indigo background */
`;

export const TechItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;

  &:last-child {
    border-bottom: none;
  }
`;

export const TechTitle = styled.h3`
  color: #3f51b5; /* Indigo */
  margin-bottom: 5px;
  font-size: 1.1em;
`;

export const TechDescription = styled.p`
  font-size: 14px;
  color: #546e7a; /* Grayish blue */
  margin-bottom: 8px;
`;

export const StatusIndicator = styled.span`
  background-color: ${(props) => (props.isOperational ? '#81c784' : '#ffb74d')}; /* Green for operational, orange for development */
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 0.8em;
  align-self: flex-start; /* Align to the left */
`;


// Existing styles for other components...

export const GoalsContainer = styled.div`
  border: 1px solid #a1c181; /* Soft green border */
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #e6f5e0; /* Very light green background */
`;

export const GoalItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

export const GoalTitle = styled.h3`
  color: #558b2f; /* Darker green */
  margin-bottom: 5px;
  font-size: 1.1em;
`;

export const GoalDescription = styled.p`
  font-size: 14px;
  color: #546e7a; /* Grayish blue */
  margin-bottom: 8px;
`;

export const TargetValue = styled.p`
  font-size: 0.9em;
  color: #2e7d32; /* Another shade of green */
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Timeline = styled.p`
  font-size: 0.9em;
  color: #757575;
`;



// Existing styles for other components...

export const FeedbackContainer = styled.div`
  border: 1px solid #80cbc4; /* Teal accent border */
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #e0f7fa; /* Very light teal background */
`;

export const FeedbackForm = styled.form`
  padding: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid #b2dfdb;

  h3 {
    color: #009688; /* Teal */
    margin-bottom: 10px;
    font-size: 1.1em;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #b2dfdb;
  border-radius: 3px;
  box-sizing: border-box; /* Prevent padding from increasing width */
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #b2dfdb;
  border-radius: 3px;
  box-sizing: border-box;
  min-height: 80px;
`;

export const SubmitButton = styled.button`
  background-color: #009688; /* Teal */
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #00796d; /* Darker teal */
  }
`;

export const FeedbackList = styled.div`
  padding: 15px;

  h3 {
    color: #009688; /* Teal */
    margin-bottom: 10px;
    font-size: 1.1em;
  }
`;

export const FeedbackItem = styled.div`
  padding: 8px 0;
  border-bottom: 1px dashed #b2dfdb;

  &:last-child {
    border-bottom: none;
  }
`;

export const FeedbackText = styled.p`
  font-size: 14px;
  color: #546e7a; /* Grayish blue */
  margin-bottom: 5px;
`;

export const Timestamp = styled.span`
  font-size: 0.8em;
  color: #757575;
`;


// Existing styles for other components...

export const NewsContainer = styled.div`
  border: 1px solid #9ccc65; /* Light green accent border */
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #e8f5e9; /* Very light green background */
`;

export const NewsItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #c8e6c9;

  &:last-child {
    border-bottom: none;
  }
`;

export const NewsTitle = styled.h3`
  color: #558b2f; /* Darker green */
  margin-bottom: 5px;
  font-size: 1.1em;
`;

export const PublishDate = styled.p`
  font-size: 0.8em;
  color: #757575;
  margin-bottom: 8px;
`;

export const NewsSummary = styled.p`
  font-size: 14px;
  color: #546e7a; /* Grayish blue */
  margin-bottom: 10px;
`;

export const ReadMoreLink = styled.a`
  color: #1976d2; /* Blue link color */
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;


// Existing styles for other components...

export const ControlContainer = styled.div`
  border: 1px solid #e57373; /* Light red border */
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #ffebee; /* Very light red background */
`;

export const PollutantItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #ef9a9a;

  &:last-child {
    border-bottom: none;
  }
`;

export const PollutantName = styled.h3`
  color: #d32f2f; /* Dark red */
  margin-bottom: 5px;
  font-size: 1.1em;
`;

export const CurrentLevel = styled.p`
  font-size: 14px;
  color: #f44336; /* Red */
  margin-bottom: 3px;
`;

export const TargetLevel = styled.p`
  font-size: 14px;
  color: #43a047; /* Green (for target) */
  margin-bottom: 3px;
`;

export const MitigationEfforts = styled.p`
  font-size: 14px;
  color: #757575;
  margin-top: 8px;
  margin-bottom: 3px;
  font-weight: bold;
`;

export const EffortTag = styled.span`
  background-color: #ffcdd2; /* Light red background for tags */
  color: #d32f2f; /* Dark red text for tags */
  font-size: 0.9em;
  padding: 3px 8px;
  border-radius: 15px;
  margin-right: 5px;
  margin-bottom: 5px;
  display: inline-block;
`;