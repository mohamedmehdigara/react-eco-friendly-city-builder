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