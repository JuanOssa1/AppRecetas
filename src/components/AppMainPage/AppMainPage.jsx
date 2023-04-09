import React from 'react';
import styles from './AppMainPage.module.scss';
import PhotoCarousel from '../UI/PhotoCarousel/PhotoCarousel';

function AppMainPage() {
  return (
    <>
      <section className={`${styles['main-page']}`}>
        <PhotoCarousel />
      </section>
    </>
  );
}

export default AppMainPage;
