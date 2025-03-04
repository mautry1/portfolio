import React from 'react';

interface ProjectProps {
  name: string;
  description: string;
  html_url: string;
}

const ProjectCard: React.FC<ProjectProps> = ({ name, description, html_url }) => {
  return (
    <div className="project-card">
      <h3>{name}</h3>
      <p>{description || 'No description available'}</p>
      <a href={html_url} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
    </div>
  );
};

export default ProjectCard;