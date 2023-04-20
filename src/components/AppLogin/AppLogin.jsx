import React from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import styles from './AppLogin.module.scss';
import useInput from '../../hooks/use-input';

export default function AppLogin() {
  const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  const checkMinimumCharacters = (value) => {
    return value.trim().length > 5;
  };

  const {
    value: userName,
    isValid: isValidUserName,
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

  return (
    <form className={`${styles['main-content']}`}>
      <h1>Iniciar Sesion</h1>
      <Input
        label="Correo electrónico: "
        value={userName}
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
      <Button content="Ingresar" />
      <p className={`${styles['main-content__register']}`}>
        ¿Aún no tenes cuenta? <a>Registrate</a>
      </p>
    </form>
  );
}
