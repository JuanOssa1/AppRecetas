import React from 'react';
import styles from './Card.module.scss';
import Button from '../Button/Button';
import { AiFillStar } from 'react-icons/ai';
import { useState } from 'react';
import { useEffect } from 'react';

function Card({
  category,
  imageUrl,
  name,
  steps,
  time,
  markedFavorite,
  alt = 'Default alt',
  onClickModal,
  onClickAddFavorite,
  onClickDeleteFavorite,
  onClickDeleteRecipe,
  onClickEdit,
  favoriteIsPressed,
  logStatus,
}) {
  console.log({ markedFavorite });
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(markedFavorite);
  }, [markedFavorite]);

  console.log({ isFavorite });

  const setFavoriteHandler = () => {
    console.log({ isFavorite });
    setIsFavorite((starPrevState) => !starPrevState);
    console.log({ isFavorite });
    if (isFavorite) {
      onClickDeleteFavorite();
    } else {
      onClickAddFavorite();
    }
  };

  const handleImageError = (e) => {
    e.target.src =
      'https://forum.cs-cart.com/uploads/default/original/1X/2f0984456f8dd47c5beb0a68b72c3d6cf62ef2aa.jpeg';
  };
  return (
    <section className={`${styles['card-container']}`}>
      {!logStatus.isAdmin && (
        <AiFillStar
          className={`${
            styles[!isFavorite ? 'card-container__favorite' : 'red']
          }`}
          onClick={setFavoriteHandler}
        />
      )}

      <img
        className={`${styles['card-container__image']}`}
        src={imageUrl}
        alt={alt}
        onError={(e) => handleImageError(e)}
      />
      <section className={`${styles['card-content']}`}>
        <h1 className={`${styles['card-content__name']}`}>Nombre: {name}</h1>
        <p className={`${styles['card-content__category']}`}>
          Cateogria: {category}
        </p>

        <h1 className={`${styles['card-content__time']}`}>
          Tiempo preparacion:{time}
        </h1>
        <p className={`${styles['card-content__steps']}`}>Pasos: {steps}</p>
        <section className={`${styles['card-content__buttons']}`}>
          <Button
            content="Ver mas"
            className={`${styles['card-button']}`}
            onClick={onClickModal}
          />
          {!favoriteIsPressed && !logStatus.isAdmin && (
            <Button
              content="Agregar a favoritos"
              className={`${styles['card-button']}`}
              onClick={onClickAddFavorite}
            />
          )}
          {logStatus.isAdmin && (
            <Button content="Editar" onClick={onClickEdit} />
          )}
          {logStatus.isAdmin && (
            <Button content="Eliminar Receta" onClick={onClickDeleteRecipe} />
          )}
          {favoriteIsPressed && (
            <Button
              content="Eliminar favorito"
              className={`${styles['card-button']}`}
              onClick={onClickDeleteFavorite}
            />
          )}
        </section>
      </section>
    </section>
  );
}

export default Card;
