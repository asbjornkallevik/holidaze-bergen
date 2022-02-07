import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import Logo from "./Logo";
import HamburgerMenu from "./HamburgerMenu";
/* const Link = dynamic(() => import("next/link"), {
  ssr: false,
}); */
import Link from "next/link";
import Button from "../blocks/Button";

export default function Header() {
  const router = useRouter();
  const [auth, setAuth] = useContext(AuthContext);

  let menuItems = [
    {
      slug: "",
      pageName: "Home",
      public: true,
      itemClass: router.pathname == "/" ? "menu__item active" : "menu__item",
    },
    {
      slug: "accommodation",
      pageName: "Accommodation",
      public: true,
      itemClass:
        router.pathname == "/accommodation"
          ? "menu__item active"
          : "menu__item",
    },
    {
      slug: "about-us",
      pageName: "About us",
      public: true,
      itemClass:
        router.pathname == "/about-us" ? "menu__item active" : "menu__item",
    },
    {
      slug: "contact",
      pageName: "Contact",
      public: true,
      itemClass:
        router.pathname == "/contact" ? "menu__item active" : "menu__item",
    },
    {
      slug: "admin/dashboard",
      pageName: "My dashboard",
      public: false,
      itemClass:
        router.pathname == "/admin/dashboard"
          ? "menu__item admin active"
          : "menu__item admin",
    },
  ];
  // console.log(auth);
  // Show dashboard in menu only if logged in
  if (!auth) {
    menuItems = menuItems.filter((items) => items.public === true);
  } else {
    menuItems = menuItems;
  }

  useEffect(() => {
    const loginBtn = document.querySelector("#loginBtn");
    const logoutBtn = document.querySelector("#logoutBtn");
    const header = document.querySelector(".page-header");

    window.onscroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 100) {
        header.classList.add("fillHeader");
      } else {
        header.classList.remove("fillHeader");
      }
    };

    // Display log in / log out button
    if (auth) {
      if (logoutBtn && !logoutBtn.classList.contains("show")) {
        logoutBtn.classList.add("show");
        // Log out
        logoutBtn.addEventListener("click", () => {
          setAuth(null);
          router.push("/");
          setTimeout(() => {
            loginBtn.classList.add("show");
            logoutBtn.classList.remove("show");
          }, 1000);
        });
      }
      if (loginBtn && loginBtn.classList.contains("show")) {
        loginBtn.classList.remove("show");
      }
    } else {
      if (loginBtn && !loginBtn.classList.contains("show")) {
        loginBtn.classList.add("show");
        // Go to login
        loginBtn.addEventListener("click", (e) => {
          router.push("/admin/login");
        });
      }
      if (logoutBtn && logoutBtn.classList.contains("show")) {
        logoutBtn.classList.remove("show");
      }
    }
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
