import { NavLink } from 'react-router-dom';
import logo from '../images/logo.svg';
import React from 'react';

function Header(props) {
  return (
    <header className="header">
      <a href="#"><img className="header__logo" src={logo} alt="Лого" /></a>
      <nav className="menu">
        <h2 className="menu__email"></h2>
        <NavLink className="menu__link" to="/sign-up">Регистрация</NavLink>
        {/* <NavLink className="menu__link" to="/sign-in">Войти</NavLink> */}
      </nav>
    </header>
  )
}

export default Header;