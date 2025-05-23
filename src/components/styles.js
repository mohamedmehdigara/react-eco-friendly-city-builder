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


// Existing styles for other components...

export const BannerContainer = styled.div`
  background-color: #81c784; /* Light green banner background */
  color: white;
  padding: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const CityName = styled.h1`
  font-size: 2em;
  margin-right: 20px;
`;

export const Logo = styled.img`
  height: 50px;
  margin-right: 20px;
`;

export const KeyInfo = styled.p`
  margin-right: 15px;
  font-size: 1em;
`;


// Existing styles for other components...

export const ProfileContainer = styled.div`
  border: 1px solid #90caf9; /* Light blue border */
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #e3f2fd; /* Very light blue background */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 2px solid #64b5f6; /* Blue avatar border */
`;

export const Username = styled.h2`
  color: #1e88e5; /* Blue username color */
  margin-bottom: 10px;
  font-size: 1.5em;
`;

export const UserInfo = styled.div`
  /* Styles for additional user information */
  margin-bottom: 20px;
`;

export const PreferenceSection = styled.div`
  width: 80%;
  margin-top: 20px;
  padding: 15px;
  border-top: 1px solid #bbdefb;

  h3 {
    color: #1e88e5; /* Blue heading */
    margin-bottom: 10px;
    font-size: 1.2em;
  }
`;

export const PreferenceItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const PreferenceLabel = styled.span`
  font-weight: bold;
  color: #3f51b5; /* Indigo label color */
`;

export const PreferenceValue = styled.span`
  color: #546e7a; /* Grayish blue value color */
`;


// Existing styles for other components...

export const HelpContainer = styled.div`
  border: 1px solid #ffca28; /* Light yellow border */
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fffde7; /* Very light yellow background */
`;

export const SectionTitle = styled.h2`
  color: #f9a825; /* Yellow */
  margin-bottom: 15px;
  font-size: 1.8em;
  text-align: center;
`;

export const TopicItem = styled.div`
  margin-bottom: 10px;
  border: 1px solid #fdd835; /* Slightly darker yellow border */
  border-radius: 3px;
`;

export const TopicTitle = styled.div`
  background-color: #fff8e1; /* Very light yellow background */
  color: #f9a825; /* Yellow */
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 1.2em;
  }
`;

export const TopicContent = styled.div`
  padding: 15px;
  background-color: #fffde7; /* Very light yellow background */
  color: #757575;
  font-size: 0.95em;
  white-space: pre-line; /* Preserve line breaks */
`;


// Existing styles for other components...

export const WeatherContainer = styled.div`
  border: 1px solid #b3e5fc; /* Light blue accent border */
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #e1f5fe; /* Very light blue background */
  text-align: center;
`;

export const Temperature = styled.h3`
  font-size: 2em;
  color: #29b6f6; /* Bright blue */
  margin-bottom: 5px;
`;

export const Conditions = styled.p`
  font-size: 1.2em;
  color: #4fc3f7; /* Another shade of blue */
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;


export const Details = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 0.9em;
  color: #64b5f6; /* Light blue */
`;

export const DetailItem = styled.p`
  margin: 0;
`;


// Existing styles for other components...

export const SettingsContainer = styled.div`
  border: 1px solid #80cbc4; /* Teal accent border */
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #e0f7fa; /* Very light teal background */
`;

export const SettingItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;

export const SettingLabel = styled.label`
  font-weight: bold;
  margin-right: 15px;
  width: 120px; /* Adjust as needed */
  color: #009688; /* Teal */
`;

export const TextInput = styled.input`
  padding: 10px;
  border: 1px solid #b2dfdb;
  border-radius: 3px;
  flex-grow: 1;
`;

export const SelectInput = styled.select`
  padding: 10px;
  border: 1px solid #b2dfdb;
  border-radius: 3px;
  flex-grow: 1;
`;

export const SaveButton = styled.button`
  background-color: #009688; /* Teal */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #00796d; /* Darker teal */
  }
`;


// Existing styles for other components...

export const MapContainer = styled.div`
  border: 1px solid #7cb342; /* Light green border */
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #c8e6c9; /* Very light green background */
`;

export const Zone = styled.div`
  background-color: #a5d6a7; /* Slightly darker green */
  color: white;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
  padding: 5px;
`;

export const ZoneLabel = styled.span`
  /* Style for the zone name */
`;


// Existing styles for other components...

export const AchievementsContainer = styled.div`
  border: 1px solid #ffb74d; /* Light orange border */
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #ffe0b2; /* Very light orange background */
`;

export const AchievementItem = styled.div`
  position: relative;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ffcc80; /* Slightly darker orange border */
  border-radius: 3px;
  background-color: ${({ isUnlocked }) => (isUnlocked ? '#fff3e0' : '#fbe9e7')}; /* Lighter if unlocked */
  color: ${({ isUnlocked }) => (isUnlocked ? '#5d4037' : '#795548')}; /* Darker text if locked */
  opacity: ${({ isUnlocked }) => (isUnlocked ? 1 : 0.7)};
`;

export const AchievementTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 1.2em;
`;

export const AchievementDescription = styled.p`
  font-size: 0.95em;
  margin-bottom: 10px;
`;

export const ProgressContainer = styled.div`
  background-color: #ffe0b2; /* Light orange background */
  border-radius: 5px;
  overflow: hidden;
  height: 15px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

export const ProgressBar = styled.div`
  background-color: #ff9800; /* Orange progress color */
  height: 100%;
  width: ${({ progress }) => progress}%;
  border-radius: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 5px;
  box-sizing: border-box;
`;

export const ProgressText = styled.span`
  font-size: 0.8em;
  color: #fff;
  min-width: 25px; /* Ensure text is visible */
  text-align: right;
`;

export const LockedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  border-radius: 3px;
`;


// Existing styles for other components...

export const NotificationContainer = styled.div`
  border: 1px solid #64b5f6; /* Light blue border */
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #e1f5fe; /* Very light blue background */
`;

export const NotificationItem = styled.div`
  padding: 10px;
  margin-bottom: 8px;
  border-left: 5px solid ${({ type }) => {
    switch (type) {
      case 'warning':
        return '#ffca28';
      case 'success':
        return '#66bb6a';
      case 'error':
        return '#ef5350';
      default:
        return '#29b6f6';
    }
  }};
  background-color: #fff;
  border-radius: 3px;
  display: flex;
  align-items: center;
`;

export const NotificationMessage = styled.p`
  margin: 0;
  flex-grow: 1;
  font-size: 0.95em;
`;

export const NotificationTimestamp = styled.span`
  font-size: 0.75em;
  color: #757575;
  margin-left: 10px;
`;

export const NotificationIcon = styled.span`
  margin-right: 10px;
  font-size: 1em;
`;


// Existing styles for other components...

// ResourceManager styles
export const ResourceManagerContainer = styled.div`
  border: 1px solid #aed581;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #e8f5e9;
`;

export const ResourceCategory = styled.div`
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #c5e1a5;
`;

export const CategoryTitle = styled.h3`
  color: #7cb342;
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.2em;
`;

export const ResourceItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const ResourceLabel = styled.span`
  font-weight: bold;
  margin-right: 10px;
  color: #558b2f;
  width: 120px;
`;

export const ResourceValue = styled.span`
  flex-grow: 1;
  color: #388e3c;
`;

export const ResourceDetailsButton = styled.button`
  background-color: #8bc34a;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.8em;
  margin-left: 10px;

  &:hover {
    background-color: #689f38;
  }
`;


// Existing styles for other components...

export const ConstructionContainer = styled.div`
  border: 1px solid #81d4fa; /* Light blue border */
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #e0f7fa; /* Very light blue background */
`;

export const BuildingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 8px;
  border-bottom: 1px solid #b3e5fc;

  &:last-child {
    border-bottom: none;
  }
`;

export const BuildingName = styled.span`
  font-weight: bold;
  color: #1e88e5; /* Blue */
`;

export const BuildingCost = styled.span`
  color: #42a5f5; /* Light blue */
  margin-left: 15px;
`;

export const ConstructButton = styled.button`
  background-color: #29b6f6; /* Bright blue */
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;

  &:hover {
    background-color: #039be5; /* Darker blue */
  }

  &:disabled {
    background-color: #90caf9; /* Light gray-blue */
    cursor: not-allowed;
  }
`;


// Existing styles for other components...

export const EcoScoreContainer = styled.div`
  border: 1px solid #4caf50; /* Green border */
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #e8f5e9; /* Very light green background */
  text-align: center;
`;

export const ScoreTitle = styled.h2`
  color: #43a047; /* Darker green */
  margin-top: 0;
  margin-bottom: 15px;
`;

export const OverallScore = styled.div`
  font-size: 2.5em;
  color: #66bb6a; /* Another shade of green */
  margin-bottom: 20px;
  font-weight: bold;
`;

export const ScoreItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 15px;
  border-bottom: 1px solid #c8e6c9;

  &:last-child {
    border-bottom: none;
  }
`;

export const ScoreLabel = styled.span`
  color: #388e3c; /* Dark green */
`;

export const ScoreValue = styled.span`
  font-weight: bold;
  color: #2e7d32; /* Even darker green */
`;


// Existing styles for other components...

export const InfoPanelContainer = styled.div`
  border: 1px solid #64b5f6; /* Light blue border */
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #e1f5fe; /* Very light blue background */
`;

export const PanelTitle = styled.h2`
  color: #1e88e5; /* Blue */
  margin-top: 0;
  margin-bottom: 15px;
  text-align: center;
`;

export const InfoItem = styled.div`
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid #b3e5fc;

  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  font-weight: bold;
  color: #1565c0; /* Dark blue */
  width: 120px;
  margin-right: 10px;
`;

export const InfoValue = styled.span`
  flex-grow: 1;
  color: #1976d2; /* Medium blue */
`;

export const UpgradeList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 5px;
`;

export const UpgradeItem = styled.li`
  padding: 5px 0;
  color: #2e7d32; /* Green for upgrades/effects */
`;