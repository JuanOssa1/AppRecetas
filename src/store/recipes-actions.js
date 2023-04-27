import { recipeActions } from './recipes-slice';
const URL_ALL_RECIPES =
  'https://lasrecetasdejuan-d17ba-default-rtdb.firebaseio.com/recipes';

export const fetchRecipes = (filter) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const fetchRecipes = await fetch(URL_ALL_RECIPES + '.json');
      if (!fetchRecipes.ok) {
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
        console.log(filter);
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
      console.log(recipesArray);

      dispatch(recipeActions.loadRecipes(recipesArray));
    } catch (error) {}
  };
};
export const addRecipe = (recipe) => {
  return async (dispatch) => {};
};
