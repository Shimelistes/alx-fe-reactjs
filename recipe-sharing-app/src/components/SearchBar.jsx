// src/components/SearchBar.jsx
import React from 'react';
import useRecipeStore from '../recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);

  return (
    <input
      type="text"
      placeholder="Search recipes..."
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        fontSize: '16px'
      }}
    />
  );
};

export default SearchBar;
