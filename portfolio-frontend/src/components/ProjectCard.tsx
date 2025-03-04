import React from 'react';
import './ProjectCard.css';

interface Project {
  name: string;
  description: string;
  html_url: string;
  techStack?: string[];
  liveDemoLink?: string;
}

interface ProjectProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectProps> = ({ project }) => {
  return (
    <div className="project-card">
      <h3>{project.name}</h3>
      <p>{project.description || 'No description available'}</p>
      {project.techStack && (
        <div className="tech-stack">
          {project.techStack.join(' • ')}
        </div>
      )}
      <a href={project.html_url} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
      {project.liveDemoLink && (
        <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer">
          Live Demo
        </a>
      )}
    </div>
  );
};

export default ProjectCard;