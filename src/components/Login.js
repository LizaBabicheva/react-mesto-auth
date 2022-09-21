import React from "react";
import { useHistory } from 'react-router-dom';
import * as auth from '../auth.js';

function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const history = useHistory();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    
    auth.signin(email, password)
    .then((data) => {
      if (data.token) {
        setEmail('');
        setPassword('');
        props.handleLogin();
        debugger;
        history.push('/');
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <section className="sign login">
      <h2 className="sign__header login__header">Вход</h2>
      <form className="sign__form login__form"
      onSubmit={handleSubmit}>
        <label className="sign__input-label login__input-label">
          <input className="sign__input login__input login__input_type_email" type="email" placeholder="Email" id="input-login-email" name="login-email" required
          value={email} onChange={handleEmailChange}></input>
          <span className="sign__error login__error"></span>
        </label>
        <label className="sign__input-label login__input-label">
          <input className="sign__input login__input login__input_type_password" type="password" placeholder="Пароль" id="input-login-password" name="login-password" required
          value={password} onChange={handlePasswordChange}></input>
          <span className="sign__error login__error"></span>
        </label>
        <button className="sign__submit login__submit" type="submit" aria-label="Войти">Войти</button>
      </form>
    </section>
  )
}

export default Login;