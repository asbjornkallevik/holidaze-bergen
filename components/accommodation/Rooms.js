import PropTypes from "prop-types";
import Heading from "../typography/Heading";

export default function Rooms({ items }) {
  console.log(items);
  return (
    <>
      <Heading text="Rooms" size={4} />
      {items.map((item) => {
        return (
          <div key={item.accommodation_rooms_name} className="room">
            <div>
              <Heading
                text={item.accommodation_rooms_name}
                size={5}
                customClass="room__name"
              />
            </div>
            <div className="room__price">
              NOK {item.accommodation_rooms_price},- per night
            </div>
          </div>
        );
      })}
    </>
  );
}

Rooms.propTypes = {
  items: PropTypes.array,
};
