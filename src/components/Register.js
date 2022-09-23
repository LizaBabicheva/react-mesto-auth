import { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import * as auth from '../auth.js';


function Register({ onRegister }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onRegister({
      email, 
      password
    });
  }

  return (
    <section className="sign register">
      <h2 className="sign__heading register__header">Регистрация</h2>
      <form className="sign__form register__form"
        onSubmit={handleSubmit}>
        <label className="sign__input-label register__input-label">
          <input className="sign__input register__input register__input_type_email" type="email" placeholder="Email" id="input-register-email" name="register-email" required
            value={email} onChange={handleEmailChange}></input>
          <span className="sign__error register__error"></span>
        </label>
        <label className="sign__input-label register__input-label">
          <input className="sign__input register__input register__input_type_password" type="password" placeholder="Пароль" id="input-register-password" name="register-password" required
            value={password} onChange={handlePasswordChange}></input>
          <span className="sign__error register__error"></span>
        </label>
        <button className="sign__submit register__submit" type="submit" aria-label="Зарегистрироваться">Зарегистрироваться</button>
      </form>
      <div className="register__login">
        <p className="register__login-text">Уже зарегистрированы?&nbsp;</p>
        <Link to="/sign-in" className="register__login-link">Войти</Link>
      </div>
    </section>
  )
}

export default Register;