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
  },
});

export const favoritesActions = favoriteSlice.actions;

export default favoriteSlice;
