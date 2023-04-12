import React from 'react';
import styles from './Button.module.scss';

function Button({ content = 'Default', type = 'submit', className, onClick }) {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={`${styles['main-button']} ${className}`}
      >
        {content}
      </button>
    </>
  );
}

export default Button;
