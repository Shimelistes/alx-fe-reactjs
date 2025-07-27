// components/RecipeCard.jsx
import useRecipeStore from '../recipeStore';

const RecipeCard = ({ recipe }) => {
  const { addFavorite, removeFavorite, isFavorite } = useRecipeStore();
  const favorite = isFavorite(recipe.id);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe.id);
    }
  };

  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      <p>{recipe.description.substring(0, 100)}...</p>
      <button 
        onClick={toggleFavorite}
        className={`favorite-btn ${favorite ? 'active' : ''}`}
      >
        {favorite ? '❤️ Remove Favorite' : '♡ Add Favorite'}
      </button>
    </div>
  );
};

export default RecipeCard;