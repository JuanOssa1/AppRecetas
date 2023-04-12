import React from 'react';
import styles from './Select.module.scss';

function Select({ className, label = '', defaultOption, id, options }) {
  return (
    <>
      <label id={id}>{label}</label>
      <select id={id} className={className}>
        <option>{defaultOption}</option>
        {options.map((element, index) => (
          <option key={index} value={element.toLowerCase().replace(/ /g, '')}>
            {element}
          </option>
        ))}
      </select>
    </>
  );
}

export default Select;
