// components/FavoritesList.jsx
import useRecipeStore from '../recipeStore';

const FavoritesList = () => {
  const { favorites, recipes, removeFavorite } = useRecipeStore();
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  return (
    <div className="favorites-list">
      <h2>My Favorite Recipes</h2>
      {favoriteRecipes.length === 0 ? (
        <p>You haven't favorited any recipes yet!</p>
      ) : (
        <ul className="favorites-grid">
          {favoriteRecipes.map((recipe) => (
            <li key={recipe.id} className="favorite-item">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <button 
                onClick={() => removeFavorite(recipe.id)}
                className="remove-favorite"
              >
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;