import { useState, useEffect } from "react";
import { fetchProjects } from "../api";
import { Project } from "../types/types";
import ProjectCard from "../components/ProjectCard";

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
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading projects...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  if (!projects.length) {
    return <div className="p-8">No projects found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {projects.map((project) => (
        <ProjectCard 
          key={project._id} 
          project={{
            // Map backend fields to frontend expectations
            name: project.title,       // Convert 'title' to 'name'
            description: project.description,
            html_url: project.githubLink,  // Convert 'githubLink' to 'html_url'
            // Add other necessary mappings
          }}
        />
      ))}
    </div>
  );
};

export default Projects;