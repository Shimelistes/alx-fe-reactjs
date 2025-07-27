// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import useRecipeStore from './recipeStore';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import RecommendationsPage from './pages/RecommendationsPage';
import RecipeDetails from './components/RecipeDetails';
import NavBar from './components/NavBar';

function App() {
  const setRecipes = useRecipeStore(state => state.setRecipes);

  useEffect(() => {
    // Load initial recipes
    const initialRecipes = [
      {
        id: 1,
        title: 'Vegetable Pasta',
        description: 'Healthy pasta with fresh vegetables',
        tags: ['vegetarian', 'pasta', 'healthy']
      },
      {
        id: 2,
        title: 'Chicken Curry',
        description: 'Spicy Indian chicken curry',
        tags: ['chicken', 'spicy', 'indian']
      },
      // Add more recipes with tags
    ];
    setRecipes(initialRecipes);
  }, [setRecipes]);

  return (
    <Router>
      <div className="app">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

