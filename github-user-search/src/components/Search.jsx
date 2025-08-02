// src/components/Search.js
import React, { useState } from 'react';
import { searchUsers } from '../services/githubService';



const Search = () => {
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    reposMin: '',
    language: '',
    followersMin: ''
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPage(1);
    
    try {
      const data = await searchUsers(searchParams, 1);
      setUsers(data.items);
      setHasMore(data.total_count > data.items.length);
    } catch (err) {
      setError(err.message || 'An error occurred while searching');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const data = await searchUsers(searchParams, nextPage);
      setUsers(prev => [...prev, ...data.items]);
      setHasMore(data.total_count > users.length + data.items.length);
      setPage(nextPage);
    } catch (err) {
      setError(err.message || 'Failed to load more users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">GitHub User Search</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={searchParams.username}
              onChange={handleInputChange}
              placeholder="e.g. octocat"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={searchParams.location}
              onChange={handleInputChange}
              placeholder="e.g. San Francisco"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="reposMin" className="block text-sm font-medium text-gray-700 mb-1">
              Min Repositories
            </label>
            <input
              type="number"
              id="reposMin"
              name="reposMin"
              value={searchParams.reposMin}
              onChange={handleInputChange}
              placeholder="e.g. 10"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="followersMin" className="block text-sm font-medium text-gray-700 mb-1">
              Min Followers
            </label>
            <input
              type="number"
              id="followersMin"
              name="followersMin"
              value={searchParams.followersMin}
              onChange={handleInputChange}
              placeholder="e.g. 100"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search Users'}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {users.map(user => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <img 
                src={user.avatar_url} 
                alt={`${user.login}'s avatar`} 
                className="w-16 h-16 rounded-full border border-gray-200"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">
                  <a 
                    href={user.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 hover:underline"
                  >
                    {user.login}
                  </a>
                </h2>
                {user.location && (
                  <p className="text-gray-600 flex items-center mt-1">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {user.location}
                  </p>
                )}
                <div className="flex flex-wrap gap-3 mt-2">
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                    Repos: {user.public_repos || 'N/A'}
                  </span>
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                    Followers: {user.followers || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {!loading && users.length === 0 && !error && (
        <div className="text-center py-8 text-gray-500">
          No users found. Try adjusting your search criteria.
        </div>
      )}
    </div>
  );
};

export default Search;