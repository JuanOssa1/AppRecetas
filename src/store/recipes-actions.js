import { recipeActions } from './recipes-slice';
import { notificationActions } from './notifications-slice';
import { deployNotification } from './notification-actions';
const URL_ALL_RECIPES =
  'https://lasrecetasdejuan-d17ba-default-rtdb.firebaseio.com/recipes';

export const fetchRecipes = (filter) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const fetchRecipes = await fetch(URL_ALL_RECIPES + '.json');
      if (!fetchRecipes.ok) {
        dispatch(
          deployNotification({
            status: 'Error',
            title: 'Error en el fetch',
            time: 3000,
          })
        );
        throw new Error('error');
      }
      const recipesData = await fetchRecipes.json();
      return recipesData;
    };
    try {
      const recipes = await fetchData();
      let recipesArray = [];
      for (const iterator in recipes) {
        const recipe = { ...recipes[iterator], id: iterator };
        recipesArray.push(recipe);
      }

      const filterRecipes = (filter) => {
        if (filter.byCategory !== 'all') {
          recipesArray = recipesArray.filter((recipe) => {
            return recipe.category === filter.byCategory;
          });
        }
        if (filter.byTime !== 'any') {
          recipesArray = recipesArray.filter((recipe) => {
            return recipe.time === filter.byTime;
          });
        }
      };
      if (filter) {
        filterRecipes(filter);
      }
      dispatch(
        deployNotification({
          status: 'Ok',
          title: 'Recetas cargadas adecuadamente',
          time: 2000,
        })
      );
      dispatch(recipeActions.loadRecipes(recipesArray));
    } catch (error) {}
  };
};
export const addRecipe = (recipe) => {
  return async (dispatch) => {
    const fetchRecipe = async () => {
      const request = await fetch(URL_ALL_RECIPES + '.json', {
        method: 'POST',
        body: JSON.stringify(recipe),
      });
      if (!request.ok) {
        dispatch(
          deployNotification({
            status: 'Error',
            title: 'Error en el fetch',
            time: 3000,
          })
        );
        throw new Error('Error');
      }
    };
    try {
      await fetchRecipe();
      dispatch(recipeActions.addRecipe(recipe));
      dispatch(
        deployNotification({
          status: 'Ok',
          title: 'Receta agregada adecuadamente',
          time: 2000,
        })
      );
    } catch (error) {}
  };
};
export const deleteRecipe = (recipeId) => {
  return async (dispatch) => {
    const fetchRecipe = async () => {
      const deleteRecipe = await fetch(
        URL_ALL_RECIPES + '/' + recipeId + '.json',
        {
          method: 'DELETE',
        }
      );
      if (!deleteRecipe.ok) {
        dispatch(
          deployNotification({
            status: 'Error',
            title: 'Error en el fetch',
            time: 3000,
          })
        );
        throw new Error('error');
      }
    };
    try {
      await fetchRecipe();
      dispatch(recipeActions.deleteRecipe(recipeId));
      dispatch(
        deployNotification({
          status: 'Ok',
          title: 'Recetas eliminada adecuadamente',
          time: 2000,
        })
      );
    } catch (error) {}
  };
};
export const editRecipe = (recipe) => {
  return async (dispatch) => {
    const fetchRecipes = async () => {
      const editRecipeInternal = await fetch(
        URL_ALL_RECIPES + '/' + recipe.id + '.json',
        {
          method: 'PUT',
          body: JSON.stringify(recipe),
        }
      );
      if (!editRecipeInternal.ok) {
        dispatch(
          deployNotification({
            status: 'Error',
            title: 'Error en el fetch',
            time: 3000,
          })
        );
        throw new Error('error');
      }
    };
    try {
      await fetchRecipes();
      dispatch(recipeActions.editRecipe(recipe));
      dispatch(
        deployNotification({
          status: 'Ok',
          title: 'Recetas editada adecuadamente',
          time: 2000,
        })
      );
    } catch (error) {}
  };
};
