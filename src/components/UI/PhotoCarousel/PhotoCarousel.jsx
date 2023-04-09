import React from 'react';
import { Carousel } from 'react-bootstrap';
import styles from './PhotoCarousel.module.scss';

function PhotoCarousel() {
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
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={`${styles['carousel-image']} d-block`}
          src="https://cdn11.bigcommerce.com/s-6yfyhv23lh/product_images/uploaded_images/gourmet-food-le-gourmet-central.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={`${styles['carousel-image']} d-block`}
          src="https://cdn11.bigcommerce.com/s-6yfyhv23lh/product_images/uploaded_images/le-gourmet-banner.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default PhotoCarousel;
