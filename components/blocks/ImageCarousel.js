import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import Image from "next/image";

export default function ImageCarousel({ images }) {
  return (
    <Swiper
      className="image-carousel"
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {images.map((image) => {
        return (
          <SwiperSlide key={image}>
            <Image
              src={image}
              layout="fill"
              objectFit="cover"
              alt="Hotel image"
              priority
            />
          </SwiperSlide>
        );
      })}

      {/* <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide> */}
    </Swiper>
  );
}

ImageCarousel.propTypes = {
  images: PropTypes.array,
};
