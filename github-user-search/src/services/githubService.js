import axios from 'axios';

const API_BASE_URL = 'https://api.github.com/users';

const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${username}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('User not found');
    }
    throw error;
  }
};

export default { fetchUserData };