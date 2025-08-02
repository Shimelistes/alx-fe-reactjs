// src/components/Search.jsx
import React, { useState } from 'react';
import { fetchUserData, searchUsers } from '../services/githubService';

const Search = () => {
  const [searchType, setSearchType] = useState('basic'); // 'basic' or 'advanced'
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: '',
    language: '',
    minFollowers: ''
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
        const user = await fetchUserData(searchParams.username);
        setUsers([user]);
      } else if (searchType === 'advanced') {
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
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setSearchType('basic')}
          className={`px-4 py-2 rounded-md ${searchType === 'basic' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Basic Search
        </button>
        <button
          onClick={() => setSearchType('advanced')}
          className={`px-4 py-2 rounded-md ${searchType === 'advanced' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={searchParams.username}
                onChange={handleInputChange}
                placeholder="e.g. dev"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={searchParams.location}
                onChange={handleInputChange}
                placeholder="e.g. Ethiopia"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Repos</label>
              <input
                type="number"
                name="minRepos"
                value={searchParams.minRepos}
                onChange={handleInputChange}
                placeholder="e.g. 10"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Followers</label>
              <input
                type="number"
                name="minFollowers"
                value={searchParams.minFollowers}
                onChange={handleInputChange}
                placeholder="e.g. 100"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <input
                type="text"
                name="language"
                value={searchParams.language}
                onChange={handleInputChange}
                placeholder="e.g. JavaScript"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
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

      {users.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {users.map((user) => (
      <div key={user.id} className="border p-4 rounded-md shadow">
        <div className="flex items-center space-x-4">
          <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
          <div>
            <h2 className="text-lg font-semibold">{user.name || user.login}</h2>
            <p className="text-sm text-gray-600">{user.location || 'Location unknown'}</p>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              View Profile
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
)}


      {/* Error */}
      {error && (
        <div className="text-red-600 text-center mb-4">{error}</div>
      )}

      {/* Search Results */}
      {users.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((user) => (
            <div key={user.id} className="border p-4 rounded-md shadow">
              <div className="flex items-center space-x-4">
                <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
                <div>
                  <h2 className="text-lg font-semibold">{user.name || user.login}</h2>
                  <p className="text-sm text-gray-600">{user.location || 'Location unknown'}</p>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
