// src/services/githubService.js
import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export const searchUsers = async (params, page = 1, perPage = 10) => {
  try {
    // Construct query string based on provided parameters
    let query = '';
    
    if (params.username) query += `${params.username} in:login`;
    if (params.location) query += ` location:${params.location}`;
    if (params.reposMin) query += ` repos:>=${params.reposMin}`;
    if (params.followersMin) query += ` followers:>=${params.followersMin}`;
    if (params.language) query += ` language:${params.language}`;

    // Remove any leading/trailing whitespace
    query = query.trim();

    if (!query) {
      throw new Error('Please provide at least one search criteria');
    }

    const response = await axios.get(`${BASE_URL}/search/users`, {
      params: {
        q: query,
        page,
        per_page: perPage
      }
    });

    // Fetch additional details for each user (since search API returns limited data)
    const usersWithDetails = await Promise.all(
      response.data.items.map(user => 
        axios.get(`${BASE_URL}/users/${user.login}`)
          .then(res => res.data)
          .catch(() => user) // Fallback to basic data if detailed fetch fails
      )
    );

    return {
      ...response.data,
      items: usersWithDetails
    };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403) {
        throw new Error('API rate limit exceeded. Please try again later.');
      }
      if (error.response.status === 422) {
        throw new Error('Invalid search parameters. Please adjust your search.');
      }
    }
    throw error;
  }
};