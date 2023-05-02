import React from 'react';
import * as constants from '../../constants/constants';
import Input from '../UI/Input/Input';
import Select from '../UI/Select/Select';
import Button from '../UI/Button/Button';
import styles from './AddRecipeForm.module.scss';
import useInput from '../../hooks/use-input';

function AddRecipe({ showModalHandler, sendRecipesHook, setEditValues = '' }) {
  const checkMinimumCharacters = (value) => {
    return value.trim().length > 5;
  };
  const checkValidCategorySelector = (value) => {
    return value !== 'all';
  };
  const checkValidTimeSelector = (value) => {
    return value !== 'any';
  };
  const {
    value: recipeName,
    isValid: isValidName,
    changeValueHandler: changeRecipeNameHandler,
    reset: resetRecipeName,
    inputBlurHandler: nameInputBlurHandler,
    showError: showErrorName,
  } = useInput(checkMinimumCharacters, setEditValues.name);
  const {
    value: recipeCategory,
    isValid: isValidCategory,
    changeValueHandler: changeRecipeCategoryHandler,
    reset: resetRecipeCategory,
    inputBlurHandler: categoryInputBlurHandler,
    showError: showErrorCategory,
  } = useInput(checkValidCategorySelector, 'all');
  const {
    value: recipeTime,
    isValid: isValidTime,
    changeValueHandler: changeRecipeTimeHandler,
    reset: resetRecipeTime,
    inputBlurHandler: timeInputBlurHandler,
    showError: showErrorTime,
  } = useInput(checkValidTimeSelector, 'any');
  const {
    value: recipeImage,
    isValid: isValidImage,
    changeValueHandler: changeRecipeImageHandler,
    reset: resetRecipeImage,
    inputBlurHandler: imageInputBlurHandler,
    showError: showErrorImage,
  } = useInput(checkMinimumCharacters, setEditValues.imageUrl);
  const {
    value: recipeSteps,
    isValid: isValidSteps,
    changeValueHandler: changeRecipeStepsHandler,
    reset: resetRecipeSteps,
    inputBlurHandler: stepsInputBlurHandler,
    showError: showErrorSteps,
  } = useInput(checkMinimumCharacters, setEditValues.steps);

  const submitHandler = (event) => {
    event.preventDefault();
    const recipe = {
      category: recipeCategory,
      imageUrl: recipeImage,
      name: recipeName,
      steps: recipeSteps,
      time: recipeTime,
    };
    sendRecipesHook(recipe);
    showModalHandler();
  };
  const recipeNameErrorStyles = showErrorName ? 'error' : '';
  const recipeCategoryErrorStyles = showErrorCategory ? 'error' : '';
  const recipeTimeErrorStyles = showErrorTime ? 'error' : '';
  const recipeLinkErrorStyles = showErrorImage ? 'error' : '';
  const recipeStepsErrorStyles = showErrorSteps ? 'error' : '';
  const disableButton =
    !isValidName ||
    !isValidCategory ||
    !isValidTime ||
    !isValidImage ||
    !isValidSteps;

  return (
    <section className={`${styles['modal-form']}`}>
      <div className={`${styles['modal-form__left']} `}>
        <Input
          className={`${styles['input-recipe']} ${styles[recipeNameErrorStyles]}`}
          label="Nombre de la receta"
          value={recipeName}
          onChange={changeRecipeNameHandler}
          onBlur={nameInputBlurHandler}
        />

        <Select
          className={`${styles['select-category']} ${styles[recipeCategoryErrorStyles]}`}
          label="Choose category"
          id="categories"
          value={recipeCategory}
          options={Object.values(constants.categories)}
          onChange={changeRecipeCategoryHandler}
          onBlur={categoryInputBlurHandler}
        />
        <Select
          className={`${styles['select-time']} ${styles[recipeTimeErrorStyles]}`}
          label="Choose time"
          id="CookingTime"
          value={recipeTime}
          options={Object.values(constants.cookingTime)}
          onChange={changeRecipeTimeHandler}
          onBlur={timeInputBlurHandler}
        />
        <Input
          className={`${styles['input-image']} ${styles[recipeLinkErrorStyles]}`}
          label="Link de imagen"
          value={recipeImage}
          onChange={changeRecipeImageHandler}
          onBlur={imageInputBlurHandler}
        />
      </div>
      <div className={`${styles['modal-form__left']}`}>
        <Input
          className={`${styles['input-steps']} ${styles[recipeStepsErrorStyles]}`}
          value={recipeSteps}
          label="Pasos de la receta"
          onChange={changeRecipeStepsHandler}
          onBlur={stepsInputBlurHandler}
        />
        <img
          className={`${styles['image-preview']}`}
          src={recipeImage}
          alt="Ingrese una imagen valida"
        />
        <Button
          disabled={disableButton}
          onClick={submitHandler}
          content="Agregar"
        />
      </div>
    </section>
  );
}

export default AddRecipe;
