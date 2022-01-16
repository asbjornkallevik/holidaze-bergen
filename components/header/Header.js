import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import Logo from "./Logo";
import HamburgerMenu from "./HamburgerMenu";
import Link from "next/link";
import Button from "../blocks/Button";

export default function Header() {
  const router = useRouter();
  const [auth, setAuth] = useContext(AuthContext);

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
    /* {
      slug: "admin/login",
      pageName: "Log in",
      itemClass:
        router.pathname == "/admin/login" ? "menu__item active" : "menu__item",
    }, */
  ];
  useEffect(() => {
    const loginBtn = document.querySelector("#loginBtn");
    const logoutBtn = document.querySelector("#logoutBtn");

    // Display log in / log out button
    if (auth) {
      if (!logoutBtn.classList.contains("show")) {
        logoutBtn.classList.add("show");
      }
      if (loginBtn.classList.contains("show")) {
        loginBtn.classList.remove("show");
      }
    } else {
      if (!loginBtn.classList.contains("show")) {
        loginBtn.classList.add("show");
      }
      if (logoutBtn.classList.contains("show")) {
        logoutBtn.classList.remove("show");
      }
    }
    // Go to login
    loginBtn.addEventListener("click", (e) => {
      router.push("/admin/login");
    });
    // Log out
    logoutBtn.addEventListener("click", () => {
      setAuth(null);
      setTimeout(() => {
        loginBtn.classList.add("show");
        logoutBtn.classList.remove("show");
      }, 1000);
    });
  }, [auth, router, setAuth]);
  // setAuth(null);
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
            <li className="page-header__login-btn">
              <Button text="Log in" style="success" id="loginBtn" />
            </li>
            <li className="page-header__logout-btn">
              <Button text="Log out" style="secondary" id="logoutBtn" />
            </li>
          </ul>
        </nav>
      </div>
      <div className="page-header__angle"></div>
    </header>
  );
}
