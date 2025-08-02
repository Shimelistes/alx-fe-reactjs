// src/components/Search.jsx
import React, { useState } from 'react';
import { fetchUserData, searchUsers } from '../services/githubService';

const Search = () => {
  const [searchType, setSearchType] = useState('basic'); // 'basic' or 'advanced'
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (searchType === 'basic' && searchParams.username) {
        // Basic search using fetchUserData
        const user = await fetchUserData(searchParams.username);
        setUsers([user]);
      } else if (searchType === 'advanced') {
        // Advanced search using searchUsers
        const data = await searchUsers(searchParams);
        setUsers(data.items);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while searching');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        GitHub User Search
      </h1>

      {/* Search type toggle */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setSearchType('basic')}
          className={`px-4 py-2 ${searchType === 'basic' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Basic Search
        </button>
        <button
          onClick={() => setSearchType('advanced')}
          className={`px-4 py-2 ${searchType === 'advanced' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Advanced Search
        </button>
      </div>

      {/* Search form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        {searchType === 'basic' ? (
          <div className="mb-4">
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
              required
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Advanced search fields */}
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
            {/* Other advanced fields... */}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Results display */}
      {/* ... keep your existing results display code ... */}
    </div>
  );
};

export default Search;