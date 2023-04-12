import React from 'react';
import styles from './Input.module.scss';

function Input({ label, className }) {
  return (
    <>
      <p className={`${['input-label']}`}>{label}</p>
      <input
        type="text"
        className={`${styles['main-input']}  ${className}`}
      ></input>
    </>
  );
}

export default Input;
