import React from 'react';
import { motion } from 'framer-motion';
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
    <motion.div 
      className="glass-effect rounded-xl p-6 relative overflow-hidden transform transition-all duration-300 hover:scale-[1.02]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ zIndex: 1 }}
    >
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        {project.name}
      </h3>
      
      <p className="text-gray-700 dark:text-gray-300 mb-4 min-h-[80px]">
        {project.description || 'No description available'}
      </p>
      
      {project.techStack && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex gap-4 mt-6">
        <a
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          View Code
        </a>
        {project.liveDemoLink && (
          <a
            href={project.liveDemoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;