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
      className="glass-effect hover-shine rounded-xl p-6 relative overflow-hidden transform transition-all duration-300 hover:scale-[1.02]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ zIndex: 1 }}
    >
      <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
        {project.name}
      </h3>
      
      <p className="text-gray-300 mb-4 min-h-[80px]">{project.description || 'No description available'}</p>
      
      {project.techStack && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-sm rounded-full bg-white/10 backdrop-blur-sm text-purple-300"
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
          className="flex-1 text-center py-2 px-4 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 transition-colors border border-purple-400/30 hover:border-purple-400/50"
        >
          View Code
        </a>
        {project.liveDemoLink && (
          <a
            href={project.liveDemoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 px-4 rounded-lg bg-pink-600/30 hover:bg-pink-600/50 transition-colors border border-pink-400/30 hover:border-pink-400/50"
          >
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;