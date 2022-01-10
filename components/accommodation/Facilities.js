import PropTypes from "prop-types";

export default function Facilities({ items }) {
  return (
    <>
      {items.map((facility) => {
        return (
          <div key={facility} className="facility">
            {facility}
          </div>
        );
      })}
    </>
  );
}

Facilities.propTypes = {
  items: PropTypes.array,
};
