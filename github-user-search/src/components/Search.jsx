import React, { useState } from 'react';
import githubService from '../services/githubService';

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: '',
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (resetPage = true) => {
    const currentPage = resetPage ? 1 : page + 1;
    setLoading(true);
    setError('');

    const query = buildQuery(searchParams);
    if (!query) {
      setError('Please provide at least one search criterion');
      setLoading(false);
      return;
    }

    try {
      const data = await githubService.searchUsers(query, currentPage);
      const { items, total_count } = data;

      if (resetPage) {
        setUsers(items);
        setHasMore(items.length < total_count && items.length === 30); // GitHub returns max 30 per page
      } else {
        setUsers((prev) => [...prev, ...items]);
        setHasMore(items.length > 0 && users.length + items.length < total_count);
      }

      if (resetPage) setPage(currentPage);
      else setPage(currentPage);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const buildQuery = ({ username, location, minRepos }) => {
    let query = '';
    if (username) query += `${username}`;
    if (location) query += ` location:${location}`;
    if (minRepos) query += ` repos:>=${minRepos}`;
    return query.trim();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(true); // Reset results and start from page 1
  };

  const loadMore = () => {
    handleSearch(false); // Append next page
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">GitHub User Search</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={searchParams.username}
              onChange={handleChange}
              placeholder="e.g., octocat"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={searchParams.location}
              onChange={handleChange}
              placeholder="e.g., Berlin"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Repos</label>
            <input
              type="number"
              name="minRepos"
              value={searchParams.minRepos}
              onChange={handleChange}
              placeholder="e.g., 10"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </form>

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-md transition mb-6"
        >
          {loading && page === 1 ? 'Searching...' : 'Search Users'}
        </button>

        {error && <p className="text-red-500 text-center my-4">{error}</p>}

        {loading && page === 1 && !error && (
          <p className="text-center text-gray-600">Loading...</p>
        )}

        {users.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Results ({users.length} shown)
            </h2>
            <ul className="space-y-4">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center p-4 border border-gray-200 rounded-md hover:shadow-md transition"
                >
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {user.login}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {user.location ? `📍 ${user.location}` : '📍 Location not specified'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Repositories: {user.repos_url.split('/')[4]} {/* Not ideal — better: fetch full user data */}
                    </p>
                  </div>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    View Profile
                  </a>
                </li>
              ))}
            </ul>

            {hasMore && (
              <div className="text-center mt-6">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 rounded-md font-medium transition"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;