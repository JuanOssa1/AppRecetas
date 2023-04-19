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
  });
  const showModalHandler = () => {
    setInfoModal((prevState) => {
      return { ...prevState, toggleButton: !prevState.toggleButton };
    });
  };
  const infoModalHandler = (item) => {
    showModalHandler();
    setInfoModal((prevState) => {
      return { ...prevState, valueToShow: item };
    });
  };

  return (
    <>
      {infoModal.toggleButton && (
        <CardAdditionalInfo
          onClose={showModalHandler}
          recipe={infoModal.valueToShow}
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
              onClick={() => infoModalHandler(item)}
            />
          ))}
        </section>
      </section>
    </>
  );
}

export default AppMainPage;
