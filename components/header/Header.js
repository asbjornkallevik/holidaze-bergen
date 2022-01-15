import { useRouter } from "next/router";
import Logo from "./Logo";
import HamburgerMenu from "./HamburgerMenu";
import Link from "next/link";

export default function Header() {
  const router = useRouter();

  // Create menu items and assign classes
  const menuItems = [
    {
      slug: "",
      pageName: "Home",
      itemClass: router.pathname == "/" ? "menu__item active" : "menu__item",
    },
    {
      slug: "accommodation",
      pageName: "Accommodation",
      itemClass:
        router.pathname == "/accommodation"
          ? "menu__item active"
          : "menu__item",
    },
    {
      slug: "about-us",
      pageName: "About us",
      itemClass:
        router.pathname == "/about-us" ? "menu__item active" : "menu__item",
    },
    {
      slug: "contact",
      pageName: "Contact",
      itemClass:
        router.pathname == "/contact" ? "menu__item active" : "menu__item",
    },
    {
      slug: "login",
      pageName: "Log in",
      itemClass:
        router.pathname == "/login" ? "menu__item active" : "menu__item",
    },
  ];

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
            {/* Display menu items */}
            {menuItems.map((item) => {
              return (
                <li key={item.slug} className={item.itemClass}>
                  <Link href={`/${item.slug}`}>{item.pageName}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="page-header__angle"></div>
    </header>
  );
}
