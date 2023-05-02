import React from 'react';
import { useDispatch } from 'react-redux';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import useInput from '../../hooks/use-input';
import { addUser } from '../../store/register-actions';
import { logUser } from '../../store/login-actions';
import styles from './AppRegister.module.scss';
import { useState } from 'react';

function AppRegister({ setRegister }) {
  const checkMinimumCharacters = (value) => {
    return value.trim().length > 5;
  };
  const {
    value: userEmail,
    changeValueHandler: changeUserNameHandler,
    inputBlurHandler: userNameInputBlurHandler,
  } = useInput(checkMinimumCharacters);
  const {
    value: password,
    changeValueHandler: changePasswordHandler,
    inputBlurHandler: passwordInputBlurHandler,
  } = useInput(checkMinimumCharacters);

  const dispatch = useDispatch();
  const handleClick = (event) => {
    event.preventDefault();
    dispatch(addUser({ userEmail, password }));
    dispatch(logUser({ userEmail, password }));
    setRegister();
  };

  return (
    <form className={`${styles['main-content']}`}>
      <h1>Registro</h1>
      <Input
        label="Correo electrónico: "
        value={userEmail}
        onChange={changeUserNameHandler}
        onBlur={userNameInputBlurHandler}
      />
      <Input
        label="Contraseña: "
        type="password"
        value={password}
        onChange={changePasswordHandler}
        onBlur={passwordInputBlurHandler}
      />
      <Button onClick={handleClick} content="Registrarme" />
      <p
        onClick={setRegister}
        className={`${styles['main-content__register']}`}
      >
        Ya tengo cuenta, <a>Ir a login</a>
      </p>
    </form>
  );
}

export default AppRegister;
