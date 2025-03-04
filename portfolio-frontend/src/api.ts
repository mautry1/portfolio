import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/projects`, {
      timeout: 10000 // 10 second timeout
    });
    return response.data.projects;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || 
                      error.message || 
                      'Unknown API error';
      throw new Error(`Backend request failed: ${message}`);
    }
    throw new Error('Network error - check internet connection');
  }
};