import React from 'react';
import Modal from '../UI/Modal/Modal';
import styles from './CardAdditionalInfo.module.scss';

function CardAdditionalInfo({ info, onClose, srcImage }) {
  return (
    <Modal className={`${styles['info-modal']}`} onClose={onClose}>
      <p className={`${styles['info-text']}`}>{info}</p>
      <img
        className={`${styles['modal-image']}`}
        src={srcImage}
        alt="No cargo la imagen"
      />
    </Modal>
  );
}

export default CardAdditionalInfo;
