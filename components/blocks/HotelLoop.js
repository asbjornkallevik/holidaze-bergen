import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Mousewheel } from "swiper";
import Card from "./Card";

import heroImg from "../../public/images/dummy-img.jpg";

export default function HotelLoop(props) {
  const hotels = props.hotels;
  return (
    <Swiper
      className="hotel-loop"
      modules={[EffectCoverflow, Navigation, Mousewheel]}
      navigation
      mousewheel
      spaceBetween={400}
      speed={800}
      slidesPerView={2}
      centeredSlides={true}
      effect="coverflow"
      coverflowEffect={{
        depth: 150,
        rotate: 0,
        // scale: 0.8,
        // transformEl: "p",
        slideShadows: false,
      }}
      onSlideChange={(swiper) => {
        setTimeout(function () {
          swiper.params.mousewheel.releaseOnEdges = false;
        }, 500);
      }}
      onReachEnd={(swiper) => {
        setTimeout(function () {
          swiper.params.mousewheel.releaseOnEdges = true;
        }, 750);
      }}
      onReachBeginning={(swiper) => {
        setTimeout(function () {
          // swiper.params.mousewheel.releaseOnEdges = true;
        }, 750);
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
