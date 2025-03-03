import { motion } from "framer-motion";
import { Project } from "../types/types";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="text-xl font-bold mt-4 dark:text-white">
        {project.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mt-4">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectCard;