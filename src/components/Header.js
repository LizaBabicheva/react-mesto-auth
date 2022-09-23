import logo from '../images/logo.svg';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Header({ email, loggedIn }) {

  const history = useHistory();

  function signOut() {
    localStorage.removeItem('token');
    history.push('/sign-in');
  }

  return (
    <header className="header">
      <a href="#"><img className="header__logo" src={logo} alt="Лого" /></a>
      <nav className="menu">
        {loggedIn && (
          <h2 className="menu__email">{email}</h2>
        )}
        {loggedIn && (
          <button className="menu__link menu__button"
            onClick={signOut}>Выйти</button>
        )}
        {!loggedIn && (
          <Link className="menu__link" to="/sign-up">Регистрация</Link>)}
        {!loggedIn && (
          <Link className="menu__link" to="/sign-in">Войти</Link>
        )}

      </nav>
    </header>
  )
}

export default Header;