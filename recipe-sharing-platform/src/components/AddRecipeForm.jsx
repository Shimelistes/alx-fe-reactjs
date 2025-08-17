import React, { useState } from "react";

const AddRecipeForm = ({ onAddRecipe }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Recipe title is required.";
    }

    if (!ingredients.trim()) {
      newErrors.ingredients = "Please enter ingredients.";
    } else {
      const ingredientsList = ingredients.split(",").map((i) => i.trim());
      if (ingredientsList.length < 2) {
        newErrors.ingredients = "Include at least two ingredients.";
      }
    }

    if (!steps.trim()) {
      newErrors.steps = "Please enter preparation steps.";
    } else {
      const stepsList = steps
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      if (stepsList.length < 2) {
        newErrors.steps = "Include at least two steps.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const newRecipe = {
      id: Date.now(),
      title,
      summary: steps.split("\n")[0] || "No summary provided",
      image: "https://via.placeholder.com/300x200",
      ingredients: ingredients.split(",").map((i) => i.trim()),
      instructions: steps
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    onAddRecipe(newRecipe);

    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({});
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl md:max-w-2xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Add New Recipe
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded-2xl shadow-lg space-y-4"
      >
        {/* Recipe Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Recipe Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 md:py-3 focus:outline-none focus:ring-2 ${
              errors.title
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-blue-400"
            }`}
            placeholder="Enter recipe title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Ingredients (comma separated)
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 md:py-3 focus:outline-none focus:ring-2 ${
              errors.ingredients
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-blue-400"
            }`}
            placeholder="e.g. flour, sugar, eggs"
            rows="3"
          ></textarea>
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
          )}
        </div>

        {/* Steps */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Preparation Steps (one per line)
          </label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 md:py-3 focus:outline-none focus:ring-2 ${
              errors.steps
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-blue-400"
            }`}
            placeholder={`e.g.\nMix ingredients\nBake for 30 minutes`}
            rows="5"
          ></textarea>
          {errors.steps && (
            <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 md:py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
