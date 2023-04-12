import React from 'react';
import Modal from '../UI/Modal/Modal';

function CardAdditionalInfo({ info, onClose }) {
  return (
    <Modal onClose={onClose}>
      <p>{info}</p>
    </Modal>
  );
}

export default CardAdditionalInfo;
