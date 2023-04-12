import React from 'react';
import * as constants from '../../constants/constants';
import Input from '../UI/Input/Input';
import Select from '../UI/Select/Select';
import Button from '../UI/Button/Button';
import styles from './AddRecipeForm.module.scss';
import useInput from '../../hooks/use-input';

function AddRecipe({ showModalHandler, sendRecipesHook }) {
  const {
    value: recipeName,
    changeValueHandler: changeRecipeNameHandler,
    reset: resetRecipeName,
  } = useInput();
  const {
    value: recipeCategory,
    changeValueHandler: changeRecipeCategoryHandler,
    reset: resetRecipeCategory,
  } = useInput();
  const {
    value: recipeTime,
    changeValueHandler: changeRecipeTimeHandler,
    reset: resetRecipeTime,
  } = useInput();
  const {
    value: recipeImage,
    changeValueHandler: changeRecipeImageHandler,
    reset: resetRecipeImage,
  } = useInput();
  const {
    value: recipeSteps,
    changeValueHandler: changeRecipeStepsHandler,
    reset: resetRecipeSteps,
  } = useInput();

  const submitHandler = (event) => {
    event.preventDefault();
    const recipe = {
      category: recipeCategory,
      imageUrl: recipeImage,
      name: recipeName,
      steps: recipeSteps,
      time: recipeTime,
    };
    console.log(recipe);
    sendRecipesHook(recipe);
    showModalHandler();
  };
  return (
    <section className={`${styles['modal-form']}`}>
      <div className={`${styles['modal-form__left']}`}>
        <Input
          className={`${styles['input-recipe']}`}
          label="Nombre de la receta"
          value={recipeName}
          onChange={changeRecipeNameHandler}
        />

        <Select
          className={`${styles['select-category']}`}
          defaultOption="Choose category"
          id="categories"
          value={recipeCategory}
          options={Object.values(constants.categories)}
          onChange={changeRecipeCategoryHandler}
        />
        <Select
          className={`${styles['select-time']}`}
          defaultOption="Choose time"
          id="CookingTime"
          value={recipeTime}
          options={Object.values(constants.cookingTime)}
          onChange={changeRecipeTimeHandler}
        />
        <Input
          className={`${styles['input-image']}`}
          label="Link de imagen"
          value={recipeImage}
          onChange={changeRecipeImageHandler}
        />
      </div>
      <div className={`${styles['modal-form__left']}`}>
        <Input
          className={`${styles['input-steps']}`}
          value={recipeSteps}
          label="Pasos de la receta"
          onChange={changeRecipeStepsHandler}
        />
        <Button onClick={submitHandler} content="Agregar" />
      </div>
    </section>
  );
}

export default AddRecipe;
