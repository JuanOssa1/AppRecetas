import React from 'react';
import styles from './Input.module.scss';

function Input({ label, className, value, onChange }) {
  return (
    <>
      <p className={`${['input-label']}`}>{label}</p>
      <input
        type="text"
        className={`${styles['main-input']}  ${className}`}
        value={value}
        onChange={onChange}
      ></input>
    </>
  );
}

export default Input;
