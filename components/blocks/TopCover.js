import PropTypes from "prop-types";
import Image from "next/image";

function TopCover({ children, img, size }) {
  return (
    <div className={`top-cover top-cover--${size} alignfull`}>
      <Image
        src={img}
        layout="fill"
        objectFit="cover"
        quality="50"
        alt="Bergen"
      />
      <div className="top-cover__inner-container">{children}</div>
    </div>
  );
}

// Type check
TopCover.propTypes = {
  children: PropTypes.node,
  size: PropTypes.string,
  img: PropTypes.string,
};

export default TopCover;
