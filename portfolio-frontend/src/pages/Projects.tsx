import { useState, useEffect } from "react";
import { fetchProjects } from "../api";
import ProjectCard from "../components/ProjectCard";

interface Project {
  _id: string;
  title: string;
  description: string;
  githubLink: string;
  techStack?: string[];
  liveDemoLink?: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load projects");
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center space-y-4">
        <div className="animate-spin text-4xl">⏳</div>
        <p className="text-lg">Loading projects...</p>
        <p className="text-sm text-gray-500">
          This might take up to 1 minute on first load (Render free tier)
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-500 mb-4 text-lg">⚠️ {error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!projects.length) {
    return <div className="p-8 text-center">No projects found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {projects.map((project) => (
        <ProjectCard 
          key={project._id}
          project={{
            name: project.title,
            description: project.description,
            html_url: project.githubLink,
            techStack: project.techStack,
            liveDemoLink: project.liveDemoLink
          }}
        />
      ))}
    </div>
  );
};

export default Projects;