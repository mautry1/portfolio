import React from 'react';
import { AcademicCapIcon } from '@heroicons/react/solid'; // Example icon

interface Repo {
  name: string;
  description: string;
  html_url: string;
}

interface ProjectCardProps {
  repo: Repo;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ repo }) => {
  return (
    <div className="project-card">
      <h3>{repo.name}</h3>
      <p>{repo.description || 'No description available'}</p>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
      {/* Example usage of a Heroicon */}
      <AcademicCapIcon className="h-5 w-5 text-blue-500" />
    </div>
  );
};

export default ProjectCard;