import React from 'react';
import styles from './Button.module.scss';

function Button({ content = 'Default', type = 'submit' }) {
  return (
    <>
      <button type={type} className={`${styles['main-button']}`}>
        {content}
      </button>
    </>
  );
}

export default Button;
