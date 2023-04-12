import { useState } from 'react';

const useInput = () => {
  const [value, setValue] = useState('');

  const changeValueHandler = (event) => {
    setValue(event.target.value);
  };
  const reset = () => {
    setValue('');
  };
  return {
    value: value,
    changeValueHandler,
    reset,
  };
};

export default useInput;
