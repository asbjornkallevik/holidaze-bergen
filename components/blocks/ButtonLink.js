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

function ButtonLink({ text, style, link, id, short, customClass }) {
  let btnClass = style ? `btn btn--${style}` : "btn";
  btnClass += short ? " btn--short" : "";
  btnClass += customClass ? " " + customClass : "";

  return (
    <Link href={link} passHref>
      <a className={btnClass} id={id} type="submit">
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
  customClass: PropTypes.string,
};

ButtonLink.defaultProps = {
  text: "Read more",
  link: "",
};
export default ButtonLink;
