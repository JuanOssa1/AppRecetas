import React from 'react';
import styles from './AppHeader.module.scss';
import Select from '../UI/Select/Select';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import Input from '../UI/Input/Input';

import { useState } from 'react';
import * as constants from '../../constants/constants';

function AppHeader() {
  const [modalAddRecipe, setModalSetRecipe] = useState(false);

  const showModalHandler = () => {
    setModalSetRecipe((prevState) => !prevState);
  };

  return (
    <>
      {modalAddRecipe && (
        <Modal onClose={showModalHandler}>
          <section className={`${styles['modal-form']}`}>
            <div className={`${styles['modal-form__left']}`}>
              <Input
                className={`${styles['input-recipe']}`}
                label="Nombre de la receta"
              />

              <Select
                className={`${styles['select-category']}`}
                defaultOption="Choose category"
                id="categories"
                options={Object.values(constants.categories)}
              />
              <Select
                className={`${styles['select-time']}`}
                defaultOption="Choose time"
                id="CookingTime"
                options={Object.values(constants.cookingTime)}
              />
              <Input
                className={`${styles['input-image']}`}
                label="Link de imagen"
              />
            </div>
            <div className={`${styles['modal-form__left']}`}>
              <Input
                className={`${styles['input-steps']}`}
                label="Pasos de la receta"
              />
              <Button onClick={showModalHandler} content="Agregar" />
            </div>
          </section>
        </Modal>
      )}
      <div className={`${styles['main-nav']}`}>
        <h1 className={`${styles['main-nav__title']}`}>Las recetas de Juan</h1>
        <Button onClick={showModalHandler} content="Agregar Receta" />
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
