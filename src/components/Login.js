import React from "react";

function Login() {
  return (
    <section className="sign login">
      <h2 className="sign__header login__header">Вход</h2>
      <form className="sign__form login__form">
        <label className="sign__input-label login__input-label">
          <input className="sign__input login__input login__input_type_email" type="email" placeholder="Email" id="input-login-email" name="login-email" required></input>
          <span className="sign__error login__error"></span>
        </label>
        <label className="sign__input-label login__input-label">
          <input className="sign__input login__input login__input_type_password" type="password" placeholder="Пароль" id="input-login-password" name="login-password" required></input>
          <span className="sign__error login__error"></span>
        </label>
        <button className="sign__submit login__submit">Войти</button>
      </form>
    </section>
  )
}

export default Login;