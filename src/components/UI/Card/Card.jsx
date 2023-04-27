import React from 'react';
import styles from './Card.module.scss';
import Button from '../Button/Button';
import { useSelector } from 'react-redux';
/**Seri adecuado meter aqui los selectores y los dispatch o no es
 * optimo porque crea muchos?
 */
function Card({
  category,
  imageUrl,
  name,
  steps,
  time,
  alt = 'Default alt',
  onClickModal,
  onClickAddFavorite,
  onClickDeleteFavorite,
  onClickDeleteRecipe,
  favoriteIsPressed,
}) {
  const handleImageError = (e) => {
    e.target.src =
      'https://forum.cs-cart.com/uploads/default/original/1X/2f0984456f8dd47c5beb0a68b72c3d6cf62ef2aa.jpeg';
  };
  const logStatus = useSelector((state) => state.login);
  return (
    <section className={`${styles['card-container']}`}>
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
        <section>
          <Button
            content="Ver mas"
            className={`${styles['card-content__button']}`}
            onClick={onClickModal}
          />
          {!favoriteIsPressed && !logStatus.isAdmin && (
            <Button
              content="Agregar a favoritos"
              className={`${styles['card-content__button']}`}
              onClick={onClickAddFavorite}
            />
          )}
          {logStatus.isAdmin && <Button content="Editar" />}
          {logStatus.isAdmin && (
            <Button content="Eliminar Receta" onClick={onClickDeleteRecipe} />
          )}
          {favoriteIsPressed && (
            <Button
              content="Eliminar favorito"
              className={`${styles['card-content__button']}`}
              onClick={onClickDeleteFavorite}
            />
          )}
        </section>
      </section>
    </section>
  );
}

export default Card;
