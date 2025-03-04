import React from 'react';

interface Project {
  name: string;
  description: string;
  html_url: string;
}

interface ProjectProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectProps> = ({ project }) => {
  return (
    <div className="project-card">
      <h3>{project.name}</h3>
      <p>{project.description || 'No description available'}</p>
      <a href={project.html_url} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
    </div>
  );
};

export default ProjectCard;