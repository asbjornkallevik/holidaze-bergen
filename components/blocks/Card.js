import PropTypes from "prop-types";
import Heading from "../typography/Heading";
import Button from "./Button";
import Triangle from "../layout/Triangle";
import Image from "next/image";
import dummyImg from "../..//public/images/dummy-img.jpg";

function Card(props) {
  console.log(props);
  return (
    <div className="card">
      <div className="card__background">
        <div className="card__background-color"></div>
        <div className="card__background-triangle">
          <Triangle />
        </div>
      </div>
      <div className="card__header">
        <Image src={dummyImg} layout="fill" objectFit="cover" alt="Hotel" />
      </div>
      <div className="card__body">
        <Heading text="Hotel Lorum" size={4} />
        <p className="card__excerpt">
          This is a nice little hotel in the centre of Bergen. At Hotel Lorem
          you can relax and stay warm at night, after your numerous adventures
          during daytime.
        </p>
        <div className="card__features">
          <div className="feature-label">Free WiFi</div>
          <div className="feature-label">Parking</div>
          <div className="feature-label">Breakfast included</div>
          <div className="feature-label">King size bed</div>
        </div>
      </div>
      <div className="card__footer">
        <Button text="View more" type="highlight" link="test" />
      </div>
    </div>
  );
}

Card.propTypes = {
  test: PropTypes.string.isRequired,
};

export default Card;
