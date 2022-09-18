import React from "react";

function Register() {
  return (
    <section className="sign register">
      <h2 className="sign__header register__header">Регистрация</h2>
      <form className="sign__form register__form">
        <label className="sign__input-label register__input-label">
          <input className="sign__input register__input register__input_type_email" type="email" placeholder="Email" id="input-register-email" name="register-email" required></input>
          <span className="sign__error register__error"></span>
        </label>
        <label className="sign__input-label register__input-label">
          <input className="sign__input register__input register__input_type_password" type="password" placeholder="Пароль" id="input-register-password" name="register-password" required></input>
          <span className="sign__error register__error"></span>
        </label>
        <button className="sign__submit register__submit">Зарегистрироваться</button>
      </form>
      <div className="register__login">
        <p className="register__login-text">Уже зарегистрированы?&nbsp;</p>
        {/* <Link to="" className="register__login-link">Войти</Link> */}
        <p className="register__login-link">Войти</p>
      </div>
    </section>
  )
}

export default Register;