import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Logo from "../header/Logo";
import Link from "next/link";
import Heading from "../typography/Heading";

export default function Footer() {
  const [auth, setAuth] = useContext(AuthContext);
  return (
    <footer className="page-footer">
      <div className="page-footer__logo-wrapper">
        <Logo customClass="page-footer__logo" includeTag={false} />
      </div>
      <div className="page-footer__content">
        <p>
          Made by Asbj&oslash;rn Kallevik, for the Project Exam 2 assignment at
          Noroff Frontend Web Development studies
        </p>
      </div>
      <div className="page-footer__primary-menu">
        <div className="page-footer__nav-wrapper">
          <nav>
            <Heading text="Primary menu" size={3} />
            <ul className="page-footer__menu menu">
              {/* Display menu items */}

              <li className="menu__item">
                <Link href="/">Home</Link>
              </li>
              <li className="menu__item">
                <Link href="/accommodation">Accommodation</Link>
              </li>
              <li className="menu__item">
                <Link href="/about-us">About us</Link>
              </li>
              <li className="menu__item">
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {auth ? (
        <div className="page-footer__admin-menu">
          <div className="page-footer__nav-wrapper">
            <nav>
              <Heading text="Admin menu" size={3} />
              <ul className="page-footer__menu menu">
                {/* Display menu items */}

                <li className="menu__item">
                  <Link href="/admin/dashboard">Dashboard</Link>
                </li>
                <li className="menu__item">
                  <Link href="/add-new">Add new hotel</Link>
                </li>
                <li className="menu__item">
                  <Link href="/edit-hotel">Edit hotel</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      ) : (
        ""
      )}
    </footer>
  );
}
