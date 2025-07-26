import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  
  // Add a new recipe
  addRecipe: (newRecipe) => 
    set((state) => ({ 
      recipes: [...state.recipes, { ...newRecipe, id: Date.now() }] 
    })),
  
  // Delete a recipe by ID
  deleteRecipe: (id) => 
    set((state) => ({ 
      recipes: state.recipes.filter(recipe => recipe.id !== id) 
    })),
  
  // Update an existing recipe
  updateRecipe: (id, updatedRecipe) => 
    set((state) => ({
      recipes: state.recipes.map(recipe => 
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      )
    })),
  
  // Initialize recipes (optional)
  setRecipes: (recipes) => set({ recipes })
}));

export default useRecipeStore;