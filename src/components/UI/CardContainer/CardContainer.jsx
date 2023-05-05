import React from 'react';
import Card from '../Card/Card';
import styles from './CardContainer.module.scss';
import { useSelector } from 'react-redux';

function CardContainer({
  cardToRender,
  infoModalHandler,
  addFavoriteHandler,
  deleteFavoriteHandler,
  favoriteIsPressed,
  deleteRecipe,
  displayEdit,
}) {
  const logStatus = useSelector((state) => state.login);
  console.log(cardToRender);
  return (
    <section className={`${styles['cards-container']}`}>
      {cardToRender.map((item) => (
        <Card
          key={item}
          category={item.category}
          name={item.name}
          steps={item.steps}
          time={item.time}
          imageUrl={item.imageUrl}
          markedFavorite={item.isFavorite}
          onClickModal={() => infoModalHandler(item)}
          onClickAddFavorite={() => addFavoriteHandler(item.id)}
          onClickDeleteFavorite={() => deleteFavoriteHandler(item.id)}
          onClickDeleteRecipe={() => deleteRecipe(item.id)}
          onClickEdit={() => displayEdit(item)}
          favoriteIsPressed={favoriteIsPressed}
          logStatus={logStatus}
        />
      ))}
    </section>
  );
}

export default CardContainer;
