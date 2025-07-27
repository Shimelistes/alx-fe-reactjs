// src/App.jsx
import React, { useEffect } from 'react';
import useRecipeStore from './recipeStore';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';

function App() {
  const setRecipes = useRecipeStore(state => state.setRecipes);

  useEffect(() => {
    // Example recipes
    const initialRecipes = [
      { title: 'Pasta', description: 'Delicious pasta recipe.' },
      { title: 'Salad', description: 'Fresh and healthy.' }
    ];
    setRecipes(initialRecipes);
  }, [setRecipes]);

  return (
    <div className="App">
      <h1>Recipe Sharing App</h1>
      <SearchBar />
      <RecipeList />
    </div>
  );
}

export default App;
