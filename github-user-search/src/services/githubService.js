// src/services/githubService.js
import axios from 'axios';


const BASE_URL = 'https://api.github.com/search/users?q';

// Basic user fetch (single user)
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    throw error;
  }
};

// Advanced search (multiple users)
export const searchUsers = async (params = {}, page = 1, perPage = 10) => {
  // ... keep your existing searchUsers implementation ...
};



/**
 * Search GitHub users with advanced filters
 * @param {Object} params - Search parameters
 * @param {string} [params.username] - Username or part of username
 * @param {string} [params.location] - User location
 * @param {number} [params.minRepos] - Minimum number of repositories
 * @param {number} [params.minFollowers] - Minimum number of followers
 * @param {string} [params.language] - Primary programming language
 * @param {number} [page=1] - Page number for pagination
 * @param {number} [perPage=10] - Results per page
 * @returns {Promise<Object>} Search results
 */
    // Construct query string with all parameters
    const queryParts = [];
    
    if (params.username) queryParts.push(`${params.username} in:login`);
    if (params.location) queryParts.push(`location:"${params.location}"`);
    if (params.minRepos) queryParts.push(`repos:>=${params.minRepos}`);
    if (params.minFollowers) queryParts.push(`followers:>=${params.minFollowers}`);
    if (params.language) queryParts.push(`language:"${params.language}"`);

    const query = queryParts.join(' ');

    if (!query.trim()) {
      throw new Error('Please provide at least one search criteria');
    }

    // Make the API request to search endpoint
    const response = await axios.get(`${BASE_URL}/search/users`, {
      params: {
        q: query,
        page,
        per_page: perPage,
        sort: params.sort || 'joined',
        order: params.order || 'desc'
      },
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });



    // Get detailed information for each user
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        try {
          const userResponse = await axios.get(`${BASE_URL}/users/${user.login}`);
          return userResponse.data;
        } catch (error) {
          console.error(`Failed to fetch details for user ${user.login}:`, error);
          return user; // Return basic info if detailed fetch fails
        }
      })
    );

    return {
      total_count: response.data.total_count,
      incomplete_results: response.data.incomplete_results,
      items: usersWithDetails,
      hasMore: (page * perPage) < response.data.total_count
    };

   catch (error) {
    console.error('GitHub API error:', error);
    
    if (error.response) {
      switch (error.response.status) {
        case 403:
          throw new Error('API rate limit exceeded. Please try again later.');
        case 422:
          throw new Error('Invalid search parameters. Please adjust your search.');
        case 503:
          throw new Error('GitHub service unavailable. Please try again later.');
        default:
          throw new Error(`GitHub API error: ${error.response.data.message}`);
      }
    }
    throw error;
  }

;
