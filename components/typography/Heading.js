import PropTypes from "prop-types";

function Heading({ size, text, customClass }) {
  const VariableHeading = `h${size}`;

  return (
    <>
      {/* Use custom class if provided */}
      {customClass ? (
        <VariableHeading className={customClass}>{text}</VariableHeading>
      ) : (
        <VariableHeading>{text}</VariableHeading>
      )}
    </>
  );
}

Heading.propTypes = {
  size: PropTypes.number,
  customClass: PropTypes.string,
  text: PropTypes.string.isRequired,
};

// Default size H2
Heading.defaultProps = {
  size: 2,
  customClass: "",
};
export default Heading;

// Salute to Stein Myhr for helping with this variable heading solution
