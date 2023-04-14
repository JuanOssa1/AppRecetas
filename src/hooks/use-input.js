import { useState } from 'react';

const useInput = (checkValidity, initialState = '') => {
  const [value, setValue] = useState(initialState);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = checkValidity(value);
  const showError = !valueIsValid && isTouched;

  const changeValueHandler = (event) => {
    setValue(event.target.value);
  };
  const inputBlurHandler = () => {
    setIsTouched(true);
  };
  const reset = () => {
    setValue('');
    setIsTouched(false);
  };
  return {
    value: value,
    isValid: valueIsValid,
    showError,
    changeValueHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
