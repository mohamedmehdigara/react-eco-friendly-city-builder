import styled from 'styled-components';

export const CityContainer = styled.div`
  text-align: center;
  padding: 20px;

  button {
    padding: 10px;
    margin-bottom: 20px;
    cursor: pointer;
  }

  div {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
`;

export const BuildingContainer = styled.div`
  background-color: ${(props) => (props.type === 'residential' ? '#aaf' : '#afa')};
  border: 1px solid #333;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 150px;
`;

export const ResourcePanelContainer = styled.div`
  background-color: #ccc;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
`;

export const PollutionMeterContainer = styled.div`
  background-color: #ddd;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
`;

export const EcoActionsContainer = styled.div`
  background-color: #eee;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;

  button {
    margin: 5px;
    cursor: pointer;
  }
`;

export const GameOverContainer = styled.div`
  background-color: #ffcccc;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;

  button {
    margin-top: 10px;
    cursor: pointer;
  }
`;

export const BuildingDetails = styled.p`
  color: #666;
  font-size: 14px;
  margin-top: 5px;
`;

export const UpgradeButton = styled.button`
  background-color: #8cff66;
  padding: 5px;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  color: #333;
  font-weight: bold;
  margin-top: 5px;
`;

export const EducationCenterContainer = styled.div`
background-color: #cce5ff;
padding: 20px;
margin: 10px;
border-radius: 5px;
  
`;


export const RandomEventContainer = styled.div`
  /* Add your styles for RandomEventContainer */
`;

export const TechnologyTreeContainer = styled.div`
  background-color: #e0e0e0;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;

  h2 {
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      margin-bottom: 10px;

      button {
        cursor: pointer;
      }
    }
  }
`;

export const CityExpansionContainer = styled.div`
  background-color: #ffd700;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;

  h2 {
    margin-bottom: 10px;
  }

  button {
    cursor: pointer;
  }
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