import React from 'react';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import styles from './CardAdditionalInfo.module.scss';

function CardAdditionalInfo({ info, onClose, srcImage }) {
  return (
    <Modal className={`${styles['info-modal']}`} onClose={onClose}>
      <section className={`${styles['modal-content']}`}>
        <h1></h1>
        <p className={`${styles['modal-content__text']}`}>{info}</p>
        <Button
          onClick={onClose}
          content="Cerrar"
          className={`${styles['modal-content__button']}`}
        />
      </section>

      <img
        className={`${styles['modal-image']}`}
        src={srcImage}
        alt="No cargo la imagen"
      />
    </Modal>
  );
}

export default CardAdditionalInfo;
