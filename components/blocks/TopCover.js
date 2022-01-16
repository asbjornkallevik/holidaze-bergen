import PropTypes from "prop-types";
import Image from "next/image";

function TopCover({ children, img, size, video }) {
  const overlayClass = video ? "video-overlay" : "";
  return (
    <div className={`top-cover top-cover--${size} alignfull`} role="banner">
      <Image
        src={img}
        layout="fill"
        objectFit="cover"
        quality="50"
        alt="Bergen"
      />
      {/* Display hero video if provided */}
      {video ? <video autoPlay={true} muted loop src={video} /> : ""}

      <div className={`top-cover__inner-container ${overlayClass}`}>
        {children}
      </div>
    </div>
  );
}

// Type check
TopCover.propTypes = {
  children: PropTypes.node,
  size: PropTypes.string,
  img: PropTypes.string,
  video: PropTypes.string,
};

export default TopCover;
