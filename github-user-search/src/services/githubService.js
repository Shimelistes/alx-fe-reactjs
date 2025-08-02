import axios from 'axios';

const API_BASE_URL = 'https://api.github.com';

// Use GitHub Search API: https://api.github.com/search/users?q={query}&page=1&per_page=30
const searchUsers = async (query, page = 1) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/users`, {
      params: {
        q: query,
        page,
        per_page: 30,
      },
    });
    return response.data;
  } catch (err) {
    if (err.response?.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Try again later.');
    }
    throw err;
  }
};

export default { searchUsers };