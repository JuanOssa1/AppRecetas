import React from 'react';
import styles from './Input.module.scss';

function Input({ label, className, value, onChange, onBlur, type = 'text' }) {
  return (
    <>
      <p className={`${['input-label']}`}>{label}</p>
      <input
        type={type}
        className={`${styles['main-input']}  ${className}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      ></input>
    </>
  );
}

export default Input;
