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
      dispatch(
        favoritesActions.loadFavoriteRecipes({ recipes: favoriteRecipes })
      );
    } catch (error) {}
  };
};
export const addFavoriteRecipe = () => {
  return async (dispatch) => {
    const fetchFavoritesRecipes = await fetch(URL_RECIPES);
  };
};
