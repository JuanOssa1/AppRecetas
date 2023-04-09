import React from 'react';
import styles from './AppFooter.module.scss';
import { BsTwitter, BsInstagram } from 'react-icons/bs';
import { ImFacebook, ImLinkedin2 } from 'react-icons/im';

function AppFooter() {
  return (
    <div className={`${styles['app-footer']}`}>
      <p className={`${styles['app-footer__rights']}`}>Las recetas de juan</p>
      <div className={`${styles['app-footer__social']}`}>
        <ImFacebook className={`${styles['social-icons']}`} />
        <ImLinkedin2 className={`${styles['social-icons']}`} />
        <BsTwitter className={`${styles['social-icons']}`} />
        <BsInstagram className={`${styles['social-icons']}`} />
      </div>
    </div>
  );
  //Como hago para quitar un elemento si se llega a cierto tamaño
}

export default AppFooter;
