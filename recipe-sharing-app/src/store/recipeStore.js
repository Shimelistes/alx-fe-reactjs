// recipeStore.js
import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  addRecipe: (newRecipe) => 
    set((state) => ({
      recipes: [...state.recipes, { ...newRecipe, id: Date.now() }]
    })),
  deleteRecipe: (recipeId) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== recipeId)
    })),
  updateRecipe: (recipeId, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === recipeId ? { ...recipe, ...updatedRecipe } : recipe
      )
    }))
}));

export default useRecipeStore;