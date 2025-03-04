import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/projects`);
    return response.data.projects;  // Match the backend response structure
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API request failed: ${error.response?.statusText || error.message}`);
    }
    throw new Error('Unknown error occurred while fetching projects');
  }
};