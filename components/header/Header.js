import Logo from "./Logo";
import HamburgerMenu from "./HamburgerMenu";
import Link from "next/link";

function Header() {
  return (
    <header className="page-header">
      <HamburgerMenu />

      <div className="page-header__wrapper">
        <div className="page-header__logo-wrapper">
          <Logo customClass="page-header__logo" includeTag={true} />
        </div>
      </div>
      <div className="page-header__nav-wrapper">
        <nav>
          <ul className="page-header__menu menu">
            <li className="menu__item">
              <Link href="/">Home</Link>
            </li>
            <li className="menu__item">Two</li>
            <li className="menu__item">Three</li>
            <li className="menu__item">Føør</li>
            <li className="menu__item">gdf</li>
          </ul>
        </nav>
      </div>
      <div className="page-header__angle"></div>
    </header>
  );
}

export default Header;
