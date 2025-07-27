// components/RecipeList.jsx
import { Link } from 'react-router-dom';
import useRecipeStore from '../recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div className="recipe-list">
      <h2>All Recipes</h2>
      <Link to="/add" className="add-recipe-link">Add New Recipe</Link>
      
      {recipes.length === 0 ? (
        <p>No recipes yet. Add your first recipe!</p>
      ) : (
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.id} className="recipe-item">
              <Link to={`/recipes/${recipe.id}`}>
                <h3>{recipe.title}</h3>
              </Link>
              <p>{recipe.description.substring(0, 100)}...</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;