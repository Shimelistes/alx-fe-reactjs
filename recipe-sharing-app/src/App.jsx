// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import AddRecipeform from './components/AddRecipeForm'; 

function App() {
  const setRecipes = useRecipeStore(state => state.setRecipes);

  useEffect(() => {
    const initialRecipes = [
      { title: 'Pasta', description: 'Delicious pasta recipe.' },
      { title: 'Salad', description: 'Fresh and healthy.' }
    ];
    setRecipes(initialRecipes);
  }, [setRecipes]);

  return (
    <Router>
      <div className="App" style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
        <h1 style={{ textAlign: 'center' }}>Recipe Sharing App</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <RecipeList />
              </>
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

