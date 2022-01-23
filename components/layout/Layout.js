import PropTypes from "prop-types";
import Header from "../header/Header";
import Footer from "../footer/Footer";

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
