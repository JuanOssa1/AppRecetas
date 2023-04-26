import React from 'react';
import styles from './AppMainPage.module.scss';
import PhotoCarousel from '../UI/PhotoCarousel/PhotoCarousel';
import Card from '../UI/Card/Card';
import CardAdditionalInfo from '../CardAdditionalInfo/CardAdditionalInfo';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavoriteRecipe } from '../../store/favorites-actions';

function AppMainPage({ cardToRender, favoriteIsPressed, favoriteCards }) {
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
    console.log('Test');
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
      console.log(logStatus.user.id);
      dispatch(addFavoriteRecipe(recipeId, logStatus.user.id));
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
      {!favoriteIsPressed && (
        <section className={`${styles['main-page']}`}>
          <PhotoCarousel />
          <section className={`${styles['main-page__cards']}`}>
            {cardToRender.map((item, index) => (
              <Card
                key={index}
                category={item.category}
                name={item.name}
                steps={item.steps}
                time={item.time}
                imageUrl={item.imageUrl}
                onClickModal={() => infoModalHandler(item)}
                onClickAddFavorite={() => addFavoriteHandler(item.id)}
              />
            ))}
          </section>
        </section>
      )}
      {favoriteIsPressed && (
        <section className={`${styles['main-page']}`}>
          <h1>Recetas Favoritas</h1>
          <section className={`${styles['main-page__cards']}`}>
            {favoriteCards.map((item, index) => (
              <Card
                key={index}
                category={item.category}
                name={item.name}
                steps={item.steps}
                time={item.time}
                imageUrl={item.imageUrl}
                onClickModal={() => infoModalHandler(item)}
              />
            ))}
          </section>
        </section>
      )}
    </>
  );
}

export default AppMainPage;
