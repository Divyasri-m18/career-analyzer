import React from 'react';
import type { Project } from '../../utils/skillAnalyzer';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  if (projects.length === 0) {
    return (
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Add more skills to get personalized project suggestions.
      </p>
    );
  }

  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <div key={project.title} className="project-item">
          <span className="project-number">{index + 1}</span>
          <div className="project-content">
            <h4 className="project-title">{project.title}</h4>
            <p className="project-description">{project.description}</p>
            <div className="project-skills">
              {project.relevantSkills.map((skill) => (
                <span key={skill} className="project-skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
