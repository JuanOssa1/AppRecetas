import React from 'react';
import styles from './AppHeader.module.scss';
import Select from '../UI/Select/Select';
import Button from '../UI/Button/Button';

import { useState } from 'react';
import * as constants from '../../constants/constants';

function AppHeader({ addRecipeHandler }) {
  return (
    <>
      <div className={`${styles['main-nav']}`}>
        <h1 className={`${styles['main-nav__title']}`}>Las recetas de Juan</h1>
        <Button onClick={addRecipeHandler} content="Agregar Receta" />
        <form className={`${styles['main-nav__form']}`}>
          <Select
            defaultOption="Choose category"
            id="categories"
            options={Object.values(constants.categories)}
          />
          <Select
            defaultOption="Choose time"
            id="CookingTime"
            options={Object.values(constants.cookingTime)}
          />
        </form>
      </div>
    </>
  );
}

export default AppHeader;
