// Example - to be created in future tasks
import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_GITHUB_API_URL;

export const searchUsers = async (query) => {
  const response = await axios.get(`${API_URL}/search/users`, {
    params: { q: query },
  });
  return response.data;
};