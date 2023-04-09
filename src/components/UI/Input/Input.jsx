import React from 'react';
import styles from './Input.module.scss';

function Input() {
  return (
    <>
      <input type="text" className={`${styles['main-input']}`}></input>
    </>
  );
}

export default Input;
