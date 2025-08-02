import React, { useState } from 'react';
import githubService from '../services/githubService';
import './Search.css';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    setUser(null);

    try {
      const userData = await githubService.fetchUserData(username);
      setUser(userData);
    // } catch (err) {
      setError('Looks like we can’t find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h1>GitHub User Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      
      {error && <p className="error">{error}</p>}

      {user && !loading && (
        <div className="user-card">
          <img src={user.avatar_url} alt={user.name || user.login} className="avatar" />
          <h2>{user.name || user.login}</h2>
          <p>@{user.login}</p>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="profile-link">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;