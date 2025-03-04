import axios from "axios";
import { Project } from "./types/types";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get<{ projects: Project[] }>(
      `${API_BASE_URL}/api/projects`,
      {
        timeout: 60000,
        timeoutErrorMessage: 'Backend is waking up (may take up to 1 minute on free tier)',
      }
    );
    return response.data.projects;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        await new Promise(resolve => setTimeout(resolve, 5000));
        return fetchProjects();
      }
      throw new Error(error.response?.data?.error || error.message);
    }
    throw new Error('Failed to connect to backend');
  }
};