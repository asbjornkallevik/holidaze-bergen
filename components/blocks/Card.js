import PropTypes from "prop-types";
import Heading from "../typography/Heading";
import Button from "./Button";
import Triangle from "../layout/Triangle";
import Image from "next/image";
import dummyImg from "../..//public/images/dummy-img.jpg";

function Card(props) {
  const cardClass = props.layoutWide ? "card card--wide" : "card";

  return (
    <div className={cardClass}>
      <div className="card__background">
        <div className="card__background-color"></div>
        <div className="card__background-triangle">
          <Triangle />
        </div>
      </div>
      <div className="card__header">
        <Image
          src={props.imageUrl}
          layout="fill"
          objectFit="cover"
          alt="Hotel"
        />
      </div>
      <div className="card__body">
        <Heading text={props.title} size={4} />
        <div
          className="card__excerpt"
          dangerouslySetInnerHTML={{ __html: props.excerpt }}
        ></div>
        <div className="card__features">
          <div className="feature-label">Free WiFi</div>
          <div className="feature-label">Parking</div>
          <div className="feature-label">Breakfast included</div>
          <div className="feature-label">King size bed</div>
        </div>
      </div>
      <div className="card__footer">
        <Button text="View more" type="highlight" link={props.slug} />
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
  imageUrl: PropTypes.string,
  layoutWide: PropTypes.bool,
};

export default Card;
