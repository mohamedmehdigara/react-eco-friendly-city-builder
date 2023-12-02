// EducationCenter.js
import React from 'react';
import PropTypes from 'prop-types';
import { EducationCenterContainer } from '../styles';

const EducationCenter = ({ onBuildEducationCenter, onUpgrade, onResearch, courses, workshops, researchProjects, setCitizens, citizens }) => {
  const handleAdoptPractice = (practice) => {
    // Implement logic to update citizen awareness, adopted practices, and preferences
    setCitizens((prevCitizens) =>
      prevCitizens.map((citizen) => ({
        ...citizen,
        awarenessLevel: citizen.awarenessLevel + 1,
        adoptedPractices: [...citizen.adoptedPractices, practice],
        preferences: updatePreferences(citizen.preferences, practice),
      }))
    );
  };

  const updatePreferences = (preferences, practice) => {
    // Implement logic to update preferences based on the adopted practice
    // You can adjust this logic based on your game mechanics
    return {
      ...preferences,
      environmentalPolicy: adjustPolicyPreference(preferences.environmentalPolicy, practice),
    };
  };

  const adjustPolicyPreference = (currentPolicy, practice) => {
    // Implement logic to adjust policy preference based on the adopted practice
    // You can consider the type of practice and its impact on policy preference
    // For example, adopting a renewable energy practice may make citizens more supportive
    // of environmental policies.
    return currentPolicy;
  };

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

      {/* Display citizen preferences */}
      <h3>Citizen Preferences</h3>
      {citizens && citizens.map((citizen) => (
        <div key={citizen.id}>
          <p>Citizen {citizen.id}</p>
          <p>Awareness Level: {citizen.awarenessLevel}</p>
          <p>Adopted Practices: {citizen.adoptedPractices.join(', ')}</p>
          <p>Environmental Policy Preference: {citizen.preferences.environmentalPolicy}</p>
        </div>
      ))}
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
  setCitizens: PropTypes.func.isRequired,
  citizens: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default EducationCenter;
