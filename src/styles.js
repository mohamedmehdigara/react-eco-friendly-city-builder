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
