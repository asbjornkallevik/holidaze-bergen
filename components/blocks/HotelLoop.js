import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper";
import Card from "./Card";

import heroImg from "../../public/images/dummy-img.jpg";

export default function HotelLoop(props) {
  const hotels = props.hotels;
  return (
    <Swiper
      className="hotel-loop"
      modules={[EffectCoverflow]}
      spaceBetween={80}
      slidesPerView={3}
      centeredSlides={true}
      effect="coverflow"
      coverflowEffect={{
        depth: 150,
        rotate: 0,
        // scale: 0.8,
        // transformEl: "p",
        slideShadows: false,
      }}
    >
      {hotels.map((hotel) => {
        return (
          <SwiperSlide key={hotel.id}>
            <Card
              //   layoutWide={true}
              key={hotel.slug}
              id={hotel.id}
              slug={`/accommodation/${hotel.slug}`}
              title={hotel.title}
              excerpt={hotel.excerpt}
              imageUrl={hotel.imageUrl}
              facilities={hotel.facilities}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

HotelLoop.propTypes = {
  hotels: PropTypes.array,
};
