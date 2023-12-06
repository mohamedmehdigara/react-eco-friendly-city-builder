import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { EducationCenterContainer } from '../styles';

const EducationCenter = ({ onBuildEducationCenter, onUpgrade, onResearch, courses, workshops, researchProjects, setCitizens, citizens }) => {
  const [newCourse, setNewCourse] = useState('');
  const [newWorkshop, setNewWorkshop] = useState('');
  const [newResearchProject, setNewResearchProject] = useState('');

  const handleAdoptPractice = (practice) => {
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
    return {
      ...preferences,
      environmentalPolicy: adjustPolicyPreference(preferences.environmentalPolicy, practice),
    };
  };

  const adjustPolicyPreference = (currentPolicy, practice) => {
    return currentPolicy;
  };

  const handleNewCourse = () => {
    // Add the new course to the courses list
    // You may want to add more logic to handle duplicate names or other constraints
    onUpgrade({ type: 'course', name: newCourse });
    setNewCourse('');
  };

  const handleNewWorkshop = () => {
    // Add the new workshop to the workshops list
    onUpgrade({ type: 'workshop', name: newWorkshop });
    setNewWorkshop('');
  };

  const handleNewResearchProject = () => {
    // Add the new research project to the research projects list
    onUpgrade({ type: 'research', name: newResearchProject });
    setNewResearchProject('');
  };

  return (
    <EducationCenterContainer>
      <h2>Education Center</h2>
      <button onClick={onBuildEducationCenter}>Build Education Center</button>

      {/* Input fields for adding new courses, workshops, and research projects */}
      <div>
        <input type="text" placeholder="New Course" value={newCourse} onChange={(e) => setNewCourse(e.target.value)} />
        <button onClick={handleNewCourse}>Add Course</button>
      </div>

      <div>
        <input type="text" placeholder="New Workshop" value={newWorkshop} onChange={(e) => setNewWorkshop(e.target.value)} />
        <button onClick={handleNewWorkshop}>Add Workshop</button>
      </div>

      <div>
        <input type="text" placeholder="New Research Project" value={newResearchProject} onChange={(e) => setNewResearchProject(e.target.value)} />
        <button onClick={handleNewResearchProject}>Add Research Project</button>
      </div>

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
          <button onClick={() => handleAdoptPractice('someNewPractice')}>Adopt Practice</button>
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
