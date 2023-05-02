import React from 'react';
import styles from './AppHeader.module.scss';
import Select from '../UI/Select/Select';
import Button from '../UI/Button/Button';
import useInput from '../../hooks/use-input';
import * as constants from '../../constants/constants';
import { useEffect } from 'react';

function AppHeader({
  showFavoriteRecipesHandler,
  addRecipeHandler,
  getFilterValues,
  isLogged,
  isAdmin,
}) {
  const checkValidSelector = (value) => {
    return value !== '';
  };
  const {
    value: recipeCategory,
    changeValueHandler: changeRecipeCategoryHandler,
  } = useInput(checkValidSelector, 'all');
  const { value: recipeTime, changeValueHandler: changeRecipeTimeHandler } =
    useInput(checkValidSelector, 'any');
  useEffect(() => {
    getFilterValues(recipeCategory, recipeTime);
  }, [recipeCategory, recipeTime]);

  return (
    <>
      <div className={`${styles['main-nav']}`}>
        <h1 className={`${styles['main-nav__title']}`}>Las recetas de Juan</h1>

        {isAdmin && (
          <Button onClick={addRecipeHandler} content="Agregar Receta" />
        )}
        {!isAdmin && isLogged && (
          <Button
            onClick={showFavoriteRecipesHandler}
            content="Recetas Favoritas"
          />
        )}
        {isLogged && (
          <form className={`${styles['main-nav__form']}`}>
            <Select
              label="Choose category"
              id="categories"
              value={recipeCategory}
              options={Object.values(constants.categories)}
              onChange={changeRecipeCategoryHandler}
            />
            <Select
              label="Choose time"
              id="CookingTime"
              value={recipeTime}
              options={Object.values(constants.cookingTime)}
              onChange={changeRecipeTimeHandler}
            />
          </form>
        )}
      </div>
    </>
  );
}

export default AppHeader;
