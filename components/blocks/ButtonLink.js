import PropTypes from "prop-types";
import Link from "next/link";

/* ---
Button styles:
-primary
-secondary
-highlight
-success
-grey 
--- */

function ButtonLink({ text, style, link, id, short, customClass, left }) {
  let btnClass = style ? `btn btn--${style}` : "btn";
  btnClass += short ? " btn--short" : "";
  btnClass += left ? " btn--left" : "";
  btnClass += customClass ? " " + customClass : "";

  return (
    <Link href={link}>
      <a className={btnClass} id={id}>
        {text}
      </a>
    </Link>
  );
}

ButtonLink.propTypes = {
  text: PropTypes.string,
  style: PropTypes.string,
  link: PropTypes.string,
  id: PropTypes.string,
  short: PropTypes.bool,
  left: PropTypes.bool,
  customClass: PropTypes.string,
};

ButtonLink.defaultProps = {
  text: "Read more",
  link: "",
};
export default ButtonLink;
