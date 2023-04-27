import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: { recipes: [] },
  reducers: {
    loadFavoriteRecipes(state, action) {
      state.recipes = action.payload.recipes;
    },
    addFavoriteRecipe(state, action) {
      const newFavoriteRecipe = action.payload;
      state.recipes.push({ newFavoriteRecipe });
    },
    deleteFavoriteRecipe(state, action) {
      const recipe = state.recipes.find(
        (recipe) => recipe.id === action.payload.id
      );
      const recipeIndex = state.recipes.indexOf(recipe);
      state.recipes.slice(recipeIndex, recipeIndex);
    },
  },
});

export const favoritesActions = favoriteSlice.actions;

export default favoriteSlice;
