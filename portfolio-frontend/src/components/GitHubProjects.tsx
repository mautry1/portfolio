import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

// Import process.env variables
const username = process.env.REACT_APP_GITHUB_USERNAME || 'defaultUsername';

const GitHubProjects: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data);
        } else {
          console.error('Unexpected data structure:', data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching repos:', error);
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!repos.length) {
    return <div>No projects found.</div>;
  }

  return (
    <div className="github-projects">
      {repos.map((repo) => (
        <ProjectCard
          key={repo.id}
          project={{ // Pass as a single project object
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url
          }}
        />
      ))}
    </div>
  );
};

export default GitHubProjects;