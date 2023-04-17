import React from 'react';
import styles from './AppMainPage.module.scss';
import PhotoCarousel from '../UI/PhotoCarousel/PhotoCarousel';
import Card from '../UI/Card/Card';
import CardAdditionalInfo from '../CardAdditionalInfo/CardAdditionalInfo';
import { useState } from 'react';

function AppMainPage({ cardToRender }) {
  const [infoModal, setInfoModal] = useState({
    toggleButton: false,
    valueToShow: '',
    imageSrcToShow: '',
  });
  const showModalHandler = () => {
    setInfoModal((prevState) => {
      return { ...prevState, toggleButton: !prevState.toggleButton };
    });
  };
  const infoModalHandler = (steps) => {
    setInfoModal((prevState) => {
      return { ...prevState, valueToShow: steps };
    });
  };
  const imageModalHandler = (imageSrc) => {
    setInfoModal((prevState) => {
      return { ...prevState, imageSrcToShow: imageSrc };
    });
  };
  const displayModal = (steps, imageSrcToShow) => {
    showModalHandler();
    infoModalHandler(steps);
    imageModalHandler(imageSrcToShow);
  };
  return (
    <>
      {infoModal.toggleButton && (
        <CardAdditionalInfo
          onClose={showModalHandler}
          info={infoModal.valueToShow}
          srcImage={infoModal.imageSrcToShow}
        />
      )}
      <section className={`${styles['main-page']}`}>
        <PhotoCarousel />
        <section className={`${styles['main-page__cards']}`}>
          {cardToRender.map((item, index) => (
            <Card
              key={index}
              category={item.category}
              name={item.name}
              steps={item.steps}
              time={item.time}
              imageUrl={item.imageUrl}
              onClick={() => displayModal(item.steps, item.imageUrl)}
            />
          ))}
        </section>
      </section>
    </>
  );
}

export default AppMainPage;
