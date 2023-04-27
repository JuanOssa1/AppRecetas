import React from 'react';
import Card from '../Card/Card';
import styles from './CardContainer.module.scss';

function CardContainer({
  cardToRender,
  infoModalHandler,
  addFavoriteHandler,
  deleteFavoriteHandler,
  favoriteIsPressed,
  deleteRecipe,
}) {
  return (
    <section className={`${styles['cards-container']}`}>
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
          onClickDeleteFavorite={() => deleteFavoriteHandler(item.id)}
          onClickDeleteRecipe={() => deleteRecipe(item.id)}
          favoriteIsPressed={favoriteIsPressed}
        />
      ))}
    </section>
  );
}

export default CardContainer;
