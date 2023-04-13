import React from 'react';
import Modal from '../Modal/Modal';
import styles from './LoadingScreen.module.scss';

function LoadingScreen() {
  return (
    <Modal className={`${styles['background']}`}>
      <img
        src="https://media.tenor.com/hlKEXPvlX48AAAAC/loading-loader.gif"
        alt="No cargue"
        className={`${styles['loading-image']}`}
      />
    </Modal>
  );
}

export default LoadingScreen;
