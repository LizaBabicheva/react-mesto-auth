import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <a href="#"><img className="header__logo" src={logo} alt="Лого" /></a>
    </header>
  )
}

export default Header;