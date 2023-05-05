import { favoritesActions } from './favorites-slice';
import { deployNotification } from './notification-actions';
import { notificationActions } from './notifications-slice';

const URL_FAVORITE_RECIPES =
  'https://lasrecetasdejuan-d17ba-default-rtdb.firebaseio.com/users/';

export const fetchFavoritesRecipes = (userId) => {
  return async (dispatch) => {
    dispatch(notificationActions.setLoading(true));
    const fetchData = async () => {
      const fetchFavoritesRecipes = await fetch(
        URL_FAVORITE_RECIPES + userId + '/favoriteRecipes.json'
      );
      if (!fetchFavoritesRecipes.ok) {
        dispatch(notificationActions.setLoading(false));
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
      dispatch(notificationActions.setLoading(false));
    } catch (error) {}
  };
};
export const addFavoriteRecipe = (recipeId, userId) => {
  return async (dispatch) => {
    dispatch(notificationActions.setLoading(true));
    const fetchFavoritesRecipes = await fetch(
      URL_FAVORITE_RECIPES + userId + '/favoriteRecipes/' + recipeId + '.json',
      {
        method: 'PUT',
        body: JSON.stringify(recipeId),
      }
    );
    if (!fetchFavoritesRecipes.ok) {
      dispatch(notificationActions.setLoading(false));
      throw new Error('error');
    }
    try {
      dispatch(
        deployNotification({
          status: 'Ok',
          title: 'Receta favorita agregada!',
          time: 2000,
        })
      );
      dispatch(notificationActions.setLoading(false));
      await fetchFavoritesRecipes();
    } catch (error) {}
  };
};
export const deleteFavoriteRecipe = (recipeId, userId) => {
  return async (dispatch) => {
    dispatch(notificationActions.setLoading(true));
    const fetchRecipes = async () => {
      const deleteFavoriteRecipe = await fetch(
        URL_FAVORITE_RECIPES +
          userId +
          '/favoriteRecipes/' +
          recipeId +
          '.json',
        {
          method: 'DELETE',
        }
      );
      if (!deleteFavoriteRecipe.ok) {
        dispatch(notificationActions.setLoading(false));
        throw new Error('error');
      }
    };

    try {
      await fetchRecipes();
      dispatch(favoritesActions.deleteFavoriteRecipe(recipeId));
      dispatch(notificationActions.setLoading(false));
    } catch (error) {}
  };
};
