import React from 'react';
import { Carousel } from 'react-bootstrap';
import styles from './PhotoCarousel.module.scss';

function PhotoCarousel() {
  // map para carousel
  return (
    <Carousel className={`${styles['main-carousel']}`}>
      <Carousel.Item>
        <img
          //className="d-block"
          className={`${styles['carousel-image']} d-block`}
          src="https://cdn11.bigcommerce.com/s-6yfyhv23lh/product_images/uploaded_images/vegan.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Las recetas de Juan</h3>
          <p>Recetas para toda la familia</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={`${styles['carousel-image']} d-block`}
          src="https://cdn11.bigcommerce.com/s-6yfyhv23lh/product_images/uploaded_images/gourmet-food-le-gourmet-central.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>El gusto de Juan</h3>
          <p>Que buen gusto!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={`${styles['carousel-image']} d-block`}
          src="https://cdn11.bigcommerce.com/s-6yfyhv23lh/product_images/uploaded_images/le-gourmet-banner.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>La cocina de Juan</h3>
          <p>Nunca olvides jugar con la comida.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default PhotoCarousel;
