import PropTypes from "prop-types";
import Link from "next/link";

function Button({ text, type, link, id }) {
  const btnClass = type ? `btn btn--${type}` : "btn";

  return (
    <Link href={link} passHref>
      <a className={btnClass} id={id}>
        {text}
      </a>
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
