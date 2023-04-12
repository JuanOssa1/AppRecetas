import React from 'react';
import styles from './AppMainPage.module.scss';
import PhotoCarousel from '../UI/PhotoCarousel/PhotoCarousel';
import Card from '../UI/Card/Card';

function AppMainPage({ cardToRender }) {
  return (
    <>
      <section className={`${styles['main-page']}`}>
        <PhotoCarousel />
        <section className={`${styles['main-page__cards']}`}>
          {console.log(cardToRender)}
          {/*retorno implicito*/}
          {cardToRender.map((item, index) => (
            <Card key={index} imageUrl={item.imageUrl} />
          ))}
        </section>
      </section>
    </>
  );
}

export default AppMainPage;
