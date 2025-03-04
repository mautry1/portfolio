import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

const GitHubProjects: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace 'mautry1' with your actual GitHub username
    fetch('https://api.github.com/users/mautry1/repos')
      .then((response) => response.json())
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching repos:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        repos.map((repo) => <ProjectCard key={repo.id} repo={repo} />)
      )}
    </div>
  );
};

export default GitHubProjects;