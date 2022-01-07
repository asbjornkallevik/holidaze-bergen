import PropTypes from "prop-types";
import Link from "next/link";

function Button({ text, type, link, id }) {
  const btnClass = type ? `btn--${type}` : "btn";

  return (
    <Link href={link}>
      <div className={btnClass} id={id}>
        {text}
      </div>
    </Link>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  link: PropTypes.string,
  id: PropTypes.string,
};

Button.defaultProps = {
  text: "Read more",
  link: "",
};
export default Button;
