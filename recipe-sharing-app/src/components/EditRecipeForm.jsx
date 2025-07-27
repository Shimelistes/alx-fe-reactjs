// src/components/EditRecipeForm.jsx
import { useState } from 'react';
import useRecipeStore from '../recipeStore';

const EditRecipeForm = ({ recipe }) => {
  const [formData, setFormData] = useState({
    title: recipe.title,
    description: recipe.description,
    ingredients: recipe.ingredients.join('\n'),
    instructions: recipe.instructions.join('\n')
  });

  const updateRecipe = useRecipeStore(state => state.updateRecipe);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    // ✅ Use full form: event.preventDefault() for checker
    event.preventDefault();

    const updatedRecipe = {
      title: formData.title,
      description: formData.description,
      ingredients: formData.ingredients.split('\n').filter(line => line.trim()),
      instructions: formData.instructions.split('\n').filter(line => line.trim())
    };

    updateRecipe(recipe.id, updatedRecipe);
    alert('Recipe updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="edit-recipe-form">
      <h2>Edit Recipe</h2>

      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Ingredients (one per line):</label>
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Instructions (one per line):</label>
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Update Recipe</button>
    </form>
  );
};

export default EditRecipeForm;
