import dynamic from "next/dynamic";

import PropTypes from "prop-types";
const Header = dynamic(() => import("../header/Header"), {
  ssr: false,
});
const Footer = dynamic(() => import("../footer/Footer"), {
  ssr: false,
});

function Layout({ children, page }) {
  return (
    <>
      <Header page={page} />
      <main className={`container ${page}`}>{children}</main>
      <Footer />
    </>
  );
}

// Type check
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageClass: PropTypes.string,
};
Layout.defaultProps = {
  pageClass: "",
};

export default Layout;
