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
      const updatedRecipes = state.recipes.filter((recipe) => {
        console.log(recipe.id !== action.payload);
        return recipe !== action.payload;
      });
      state.recipes = updatedRecipes;
    },
  },
});

export const favoritesActions = favoriteSlice.actions;

export default favoriteSlice;
