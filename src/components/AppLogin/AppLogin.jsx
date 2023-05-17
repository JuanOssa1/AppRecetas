import React from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import styles from './AppLogin.module.scss';
import useInput from '../../hooks/use-input';
import { logUser } from '../../store/login-actions';
import { useDispatch } from 'react-redux';

export default function AppLogin({ setRegister }) {
  const checkMinimumCharacters = (value) => {
    return value.trim().length > 5;
  };

  const {
    value: userEmail,
    isValid: isValidUserEmail,
    changeValueHandler: changeUserNameHandler,
    reset: resetUserName,
    inputBlurHandler: userNameInputBlurHandler,
    showError: showErrorUserName,
  } = useInput(checkMinimumCharacters);
  const {
    value: password,
    isValid: isValidPassword,
    changeValueHandler: changePasswordHandler,
    reset: resetPassword,
    inputBlurHandler: passwordInputBlurHandler,
    showError: showErrorName,
  } = useInput(checkMinimumCharacters);

  const dispatch = useDispatch();
  const handleClick = (event) => {
    event.preventDefault();
    dispatch(logUser({ userEmail, password }));
  };

  return (
    <form className={`${styles['main-content']}`}>
      <h1>Iniciar Sesion</h1>
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
      <Button onClick={handleClick} content="Ingresar" />
      <p
        onClick={setRegister}
        className={`${styles['main-content__register']}`}
      >
        ¿Aún no tenes cuenta? <a>Registrate</a>
      </p>
    </form>
  );
}
