// EducationCenter.js
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { EducationCenterContainer } from '../styles';

const EducationCenter = ({ onBuildEducationCenter, onUpgrade, onResearch, courses, workshops, researchProjects }) => {
  const [citizens, setCitizens] = useState([]);

  const handleAdoptPractice = (practice) => {
    // Implement logic to update citizen awareness and adopted practices
    // For now, I assume you have a function setCitizens to update citizens
    // Replace this with your actual state update logic
    setCitizens((prevCitizens) =>
      prevCitizens.map((citizen) => ({
        ...citizen,
        awarenessLevel: citizen.awarenessLevel + 1,
        adoptedPractices: [...citizen.adoptedPractices, practice],
      }))
    );
  };

  const renderAdoptButtons = (practiceList, practiceType) => (
    <div>
      <h3>{capitalizeFirstLetter(practiceType)}</h3>
      {practiceList.map((practice) => (
        <button key={practice.id} onClick={() => handleAdoptPractice(practice)}>
          Adopt {practice.name}
        </button>
      ))}
    </div>
  );

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <EducationCenterContainer>
      <h2>Education Center</h2>
      <button onClick={onBuildEducationCenter}>Build Education Center</button>

      {/* Display available courses */}
      <h3>Available Courses</h3>
      <ul>
        {courses && courses.map((course) => (
          <li key={course.id}>
            {course.name} - <button onClick={() => onUpgrade(course.id)}>Upgrade</button>
          </li>
        ))}
      </ul>

      {/* Display available workshops */}
      <h3>Available Workshops</h3>
      <ul>
        {workshops && workshops.map((workshop) => (
          <li key={workshop.id}>
            {workshop.name} - <button onClick={() => onUpgrade(workshop.id)}>Upgrade</button>
          </li>
        ))}
      </ul>

      {/* Display available research projects */}
      <h3>Research Projects</h3>
      <ul>
        {researchProjects && researchProjects.map((project) => (
          <li key={project.id}>
            {project.name} - <button onClick={() => onResearch(project.id)}>Research</button>
          </li>
        ))}
      </ul>
    </EducationCenterContainer>
  );
};

EducationCenter.propTypes = {
  onBuildEducationCenter: PropTypes.func.isRequired,
  onUpgrade: PropTypes.func.isRequired,
  onResearch: PropTypes.func.isRequired,
  courses: PropTypes.arrayOf(PropTypes.object).isRequired,
  workshops: PropTypes.arrayOf(PropTypes.object).isRequired,
  researchProjects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default EducationCenter;
