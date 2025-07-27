// src/components/RecipeList.jsx
import React from 'react';
import useRecipeStore from '../recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);

  return (
    <div>
      {filteredRecipes.length === 0 ? (
        <p>No recipes match your search.</p>
      ) : (
        filteredRecipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;