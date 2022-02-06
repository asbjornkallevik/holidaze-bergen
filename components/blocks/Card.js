import PropTypes from "prop-types";
import Heading from "../typography/Heading";
import ButtonLink from "./ButtonLink";
import Facilities from "../accommodation/Facilities";
import Triangle from "../layout/Triangle";
import Image from "next/image";

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
        <div className="card__facilities">
          {props.facilities ? <Facilities items={props.facilities} /> : ""}
        </div>
      </div>
      <div className="card__footer">
        <ButtonLink text="View more" style="highlight" link={props.slug} />
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
  slug: PropTypes.string,
  facilities: PropTypes.array,
  imageUrl: PropTypes.string,
  layoutWide: PropTypes.bool,
};

export default Card;
