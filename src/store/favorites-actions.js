import { notificationActions } from './notifications-slice';
import { favoritesActions } from './favorites-slice';

const URL_FAVORITE_RECIPES =
  'https://lasrecetasdejuan-d17ba-default-rtdb.firebaseio.com/users/';

export const fetchFavoritesRecipes = (userId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const fetchFavoritesRecipes = await fetch(
        URL_FAVORITE_RECIPES + userId + '/favoriteRecipes.json'
      );
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
        favoriteRecipesArray.push(favoriteRecipes[iterator]);
      }

      dispatch(
        favoritesActions.loadFavoriteRecipes({ recipes: favoriteRecipesArray })
      );
    } catch (error) {}
  };
};
export const addFavoriteRecipe = (recipeId, userId) => {
  return async (dispatch) => {
    const fetchFavoritesRecipes = await fetch(
      URL_FAVORITE_RECIPES + userId + '/favoriteRecipes.json',
      {
        method: 'POST',
        body: JSON.stringify(recipeId),
      }
    );
    if (!fetchFavoritesRecipes.ok) {
      throw new Error('error');
    }
    try {
      await fetchFavoritesRecipes();
    } catch (error) {}
  };
};
