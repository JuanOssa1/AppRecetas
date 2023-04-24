import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: { recipes: [] },
  reducers: {
    loadFavoriteRecipes(state, action) {
      state.recipes = action.payload.recipes;
      console.log(state.recipes);
    },
    addFavoriteRecipe(state, action) {
      const newFavoriteRecipe = action.payload;
      const recipeAlreadyAdded = state.recipes.find(
        (recipe) => recipe.id === newFavoriteRecipe.id
      );
      if (!recipeAlreadyAdded) {
        state.recipes.push({ newFavoriteRecipe });
      }
    },
  },
});

export const favoritesActions = favoriteSlice.actions;

export default favoriteSlice;
