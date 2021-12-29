import { useEffect } from "react";

function HamburgerMenu() {
  useEffect(() => {
    const hamburger = document.querySelector(".page-header__hamburger");

    hamburger.addEventListener("click", () => {
      const header = document.querySelector(".page-header");
      if (header.classList.contains("page-header--active")) {
        header.classList.remove("page-header--active");
      } else {
        header.classList.add("page-header--active");
      }
    });
  }, []);

  return (
    <div className="page-header__hamburger">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line y1="1.25" x2="30" y2="1.25" strokeWidth="2" />
        <line y1="9.25" x2="30" y2="9.25" strokeWidth="2" />
        <line y1="17.25" x2="30" y2="17.25" strokeWidth="2" />
      </svg>
    </div>
  );
}

export default HamburgerMenu;
