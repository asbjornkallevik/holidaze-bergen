import Logo from "../Logo";
import Link from "next/link";

function Header() {
  return (
    <header className="page-header">
      {/* https://codepen.io/Jamwal/pen/jvbXyx */}
      <div className="page-header__wrapper">
        <div className="page-header__logo-wrapper">
          <Logo customClass="page-header__logo" includeTag={true} />
        </div>

        {/* <Link href="/">Tesxtt</Link> */}
        {/* <div className="page-header__nav"></div> */}
      </div>
      <div className="page-header__angle"></div>
    </header>
  );
}

export default Header;
