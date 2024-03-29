import React from 'react';
import styles from './AppMainPage.module.scss';
import PhotoCarousel from '../UI/PhotoCarousel/PhotoCarousel';
import CardAdditionalInfo from '../CardAdditionalInfo/CardAdditionalInfo';
import CardContainer from '../UI/CardContainer/CardContainer';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addFavoriteRecipe,
  deleteFavoriteRecipe,
} from '../../store/favorites-actions';

function AppMainPage({
  cardToRender,
  favoriteIsPressed,
  favoriteCards,
  editRecipeHandler,
  deleteRecipeHandler,
}) {
  const [infoModal, setInfoModal] = useState({
    toggleButton: false,
    valueToShow: '',
  });
  const favoriteRecipes = useSelector((state) => state.favorites);
  const logStatus = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const showModalHandler = () => {
    setInfoModal((prevState) => {
      return { ...prevState, toggleButton: !prevState.toggleButton };
    });
  };

  const infoModalHandler = (item) => {
    showModalHandler();
    setInfoModal((prevState) => {
      return { ...prevState, valueToShow: item };
    });
  };

  const addFavoriteHandler = (recipeId) => {
    let allowAdd = true;
    for (const recipe in favoriteRecipes.recipes) {
      if (recipe.includes(recipeId)) {
        allowAdd = false;
      }
    }
    if (allowAdd) {
      dispatch(addFavoriteRecipe(recipeId, logStatus.user.id));
    }
  };
  const deleteFavoriteHandler = (recipeId) => {
    for (const iterator of favoriteRecipes.recipes) {
      if (iterator.includes(recipeId)) {
        dispatch(deleteFavoriteRecipe(iterator, logStatus.user.id));
        return iterator;
      }
    }
  };

  return (
    <>
      {infoModal.toggleButton && (
        <CardAdditionalInfo
          onClose={showModalHandler}
          recipe={infoModal.valueToShow}
        />
      )}
      {!favoriteIsPressed ? (
        <section className={`${styles['main-page']}`}>
          <PhotoCarousel />
          <CardContainer
            displayEdit={editRecipeHandler}
            cardToRender={cardToRender}
            infoModalHandler={infoModalHandler}
            addFavoriteHandler={addFavoriteHandler}
            deleteRecipe={deleteRecipeHandler}
          />
        </section>
      ) : (
        <section className={`${styles['main-page']}`}>
          <h1>Recetas Favoritas</h1>
          <CardContainer
            cardToRender={favoriteCards}
            infoModalHandler={infoModalHandler}
            deleteFavoriteHandler={deleteFavoriteHandler}
            favoriteIsPressed={favoriteIsPressed}
          />
        </section>
      )}
    </>
  );
}

export default AppMainPage;
