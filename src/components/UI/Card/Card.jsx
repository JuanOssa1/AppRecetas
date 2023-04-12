import React from 'react';
import styles from './Card.module.scss';
import Button from '../Button/Button';

function Card({ category, imageUrl, name, steps, time, alt = 'Default alt' }) {
  return (
    <section className={`${styles['card-container']}`}>
      <img
        className={`${styles['card-container__image']}`}
        src={imageUrl}
        alt={alt}
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
        <Button
          content="Ver mas"
          className={`${styles['card-content__button']}`}
        />
      </section>
    </section>
  );
}

export default Card;
