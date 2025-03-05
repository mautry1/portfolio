import { useState, useEffect } from "react";
import { fetchProjects } from "../api";
import ProjectCard from "../components/ProjectCard";
import Scene from "../components/Scene";

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
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
        setFilteredProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load projects");
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    let filtered = projects.filter(project =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedTech ? project.techStack?.includes(selectedTech) : true)
    );
    setFilteredProjects(filtered);
  }, [searchQuery, selectedTech, projects]);

  const techStackOptions = Array.from(new Set(projects.flatMap(project => project.techStack || [])));

  if (loading) {
    return (
      <div className="p-8 text-center space-y-4">
        <div className="animate-spin text-4xl">⏳</div>
        <p className="text-lg text-gray-900 dark:text-gray-100">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-500 mb-4 text-lg">⚠️ {error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <Scene />
      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          My Projects
        </h1>

        {/* Search and Filter */}
        <div className="mb-12 space-y-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <select
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">All Technologies</option>
            {techStackOptions.map((tech, index) => (
              <option key={index} value={tech}>{tech}</option>
            ))}
          </select>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
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
      </div>
    </div>
  );
};

export default Projects;