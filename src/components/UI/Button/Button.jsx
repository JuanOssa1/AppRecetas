import React from 'react';
import styles from './Button.module.scss';

function Button({
  disabled,
  content = 'Default',
  type = 'submit',
  className,
  onClick,
}) {
  return (
    <>
      {disabled ? (
        <button disabled className={`${styles['main-button']} ${className}`}>
          {content}
        </button>
      ) : (
        <button
          onClick={onClick}
          type={type}
          className={`${styles['main-button']} ${className}`}
        >
          {content}
        </button>
      )}
    </>
  );
}

export default Button;
