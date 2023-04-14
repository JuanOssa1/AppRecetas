import React from 'react';
import styles from './AppHeader.module.scss';
import Select from '../UI/Select/Select';
import Button from '../UI/Button/Button';

import { useState } from 'react';
import useInput from '../../hooks/use-input';
import * as constants from '../../constants/constants';
import { useEffect } from 'react';

function AppHeader({ addRecipeHandler, getFilterValues }) {
  const checkValidSelector = (value) => {
    return value !== '';
  };
  const {
    value: recipeCategory,
    changeValueHandler: changeRecipeCategoryHandler,
    reset: resetRecipeCategory,
  } = useInput(checkValidSelector, 'all');
  const {
    value: recipeTime,
    changeValueHandler: changeRecipeTimeHandler,
    reset: resetRecipeTime,
  } = useInput(checkValidSelector, 'any');
  useEffect(() => {
    getFilterValues(recipeCategory, recipeTime);
  }, [recipeCategory, recipeTime]);

  return (
    <>
      <div className={`${styles['main-nav']}`}>
        <h1 className={`${styles['main-nav__title']}`}>Las recetas de Juan</h1>
        <Button onClick={addRecipeHandler} content="Agregar Receta" />
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
      </div>
    </>
  );
}

export default AppHeader;
