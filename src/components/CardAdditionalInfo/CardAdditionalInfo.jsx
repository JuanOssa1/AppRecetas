import React from 'react';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import styles from './CardAdditionalInfo.module.scss';

function CardAdditionalInfo({ recipe, onClose }) {
  return (
    <Modal className={`${styles['info-modal']}`} onClose={onClose}>
      <section className={`${styles['modal-content']}`}>
        <h1 className={`${styles['modal-content__title']}`}>{recipe.name}</h1>
        <p className={`${styles['modal-content__text']}`}>{recipe.steps}</p>
        <Button
          onClick={onClose}
          content="Cerrar"
          className={`${styles['modal-content__button']}`}
        />
      </section>

      <img
        className={`${styles['modal-image']}`}
        src={recipe.imageUrl}
        alt="No cargo la imagen"
      />
    </Modal>
  );
}

export default CardAdditionalInfo;
