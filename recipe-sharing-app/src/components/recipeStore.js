// src/recipeStore.js
import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    set(state => ({
      filteredRecipes: state.recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
      )
    }));
  },

  setRecipes: (recipes) => {
    set({ recipes, filteredRecipes: recipes }); // initialize filtered with all recipes
  },

  addRecipe: (newRecipe) => {
    set(state => {
      const updated = [...state.recipes, newRecipe];
      return {
        recipes: updated,
        filteredRecipes: updated.filter(recipe =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        )
      };
    });
  }
}));

export default useRecipeStore;

