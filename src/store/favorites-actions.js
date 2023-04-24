import { notificationActions } from './notifications-slice';
import { favoritesActions } from './favorites-slice';

const URL_RECIPES =
  'https://lasrecetasdejuan-d17ba-default-rtdb.firebaseio.com/favoriteRecipes.json';
export const fetchFavoritesRecipes = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const fetchFavoritesRecipes = await fetch(URL_RECIPES);
      if (!fetchFavoritesRecipes.ok) {
        throw new Error('error');
      }
      const favoritesRecipesData = await fetchFavoritesRecipes.json();
      return favoritesRecipesData;
    };
    try {
      const favoriteRecipes = await fetchData();
      const favoriteRecipesArray = [];
      for (const iterator in favoriteRecipes) {
        const recipe = { ...favoriteRecipes[iterator], id: iterator };
        favoriteRecipesArray.push(recipe);
      }

      dispatch(
        favoritesActions.loadFavoriteRecipes({ recipes: favoriteRecipesArray })
      );
    } catch (error) {}
  };
};
export const addFavoriteRecipe = (recipe) => {
  return async (dispatch) => {
    const fetchFavoritesRecipes = await fetch(URL_RECIPES, {
      method: 'POST',
      body: JSON.stringify(recipe),
    });
    if (!fetchFavoritesRecipes.ok) {
      throw new Error('error');
    }
    try {
      await fetchFavoritesRecipes();
    } catch (error) {}
  };
};