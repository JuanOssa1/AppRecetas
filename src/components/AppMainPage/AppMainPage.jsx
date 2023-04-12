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
          <Card imageUrl="https://www.instacart.com/company/wp-content/uploads/2021/12/christmas-food.jpg" />
          <Card imageUrl="https://www.instacart.com/company/wp-content/uploads/2021/12/christmas-food.jpg" />
          <Card imageUrl="https://www.instacart.com/company/wp-content/uploads/2021/12/christmas-food.jpg" />
          {console.log(cardToRender)}
          {cardToRender.map((item, index) => {
            <Card key={index} imageUrl={item.imageUrl}></Card>;
          })}
        </section>
      </section>
    </>
  );
}

export default AppMainPage;
