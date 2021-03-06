import PropTypes from "prop-types";

/* ---
Button styles:
-primary
-secondary
-highlight
-success
-grey 
--- */

function Button({ text, style, id, short, customClass, type }) {
  let btnClass = style ? `btn btn--${style}` : "btn";
  btnClass += short ? " btn--short" : "";
  btnClass += customClass ? " " + customClass : "";

  return (
    <button className={btnClass} id={id} type={type}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  style: PropTypes.string,
  id: PropTypes.string,
  short: PropTypes.bool,
  customClass: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  text: "Read more",
  type: "button",
};
export default Button;
