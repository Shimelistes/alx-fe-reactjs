// components/RecommendationsList.jsx
import { useEffect } from 'react';
import useRecipeStore from '../recipeStore';
import RecipeCard from './RecipeCard';

const RecommendationsList = () => {
  const { recommendations, generateRecommendations } = useRecipeStore();

  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  return (
    <div className="recommendations">
      <h2>Recommended For You</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations available yet. Try favoriting some recipes!</p>
      ) : (
        <div className="recommendations-grid">
          {recommendations.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationsList;