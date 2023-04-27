import { createSlice } from '@reduxjs/toolkit';

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: { recipes: [] },
  reducers: {
    loadRecipes(state, action) {
      state.recipes = action.payload;
    },
    addRecipe(state, action) {
      const newFavoriteRecipe = action.payload;
      state.recipes.push({ newFavoriteRecipe });
    },
    deleteRecipe(state, action) {
      const recipe = state.recipes.find(
        (recipe) => recipe.id === action.payload.id
      );
      const recipeIndex = state.recipes.indexOf(recipe);
      state.recipes.slice(recipeIndex, recipeIndex);
    },
    editRecipe(state, action) {
      const updatedRecipes = state.recipes.map((recipe) => {
        if (recipe.id === action.payload.id) {
          recipe = action.payload;
        }
        return recipe;
      });
      state.recipes = updatedRecipes;
    },
  },
});

export const recipeActions = recipeSlice.actions;

export default recipeSlice;
