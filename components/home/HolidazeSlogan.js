import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper";

export default function HolidazeSlogan() {
  const adjectives = [
    { content: "Adventurous", color: "orange" },
    { content: "eventful", color: "yellow" },
    { content: "comfy", color: "green" },
    { content: "romantic", color: "purple" },
  ];
  return (
    <div className="slogan">
      <div className="slogan__adjectives">
        <Swiper
          className="slogan__swiper"
          modules={[Autoplay, EffectCoverflow]}
          effect="coverflow"
          autoplay={{
            delay: 2000,
            reverseDirection: true,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            depth: 100,
            rotate: -150,
            transformEl: "p",
            slideShadows: false,
          }}
          direction="vertical"
          loop
          speed={800}
          spaceBetween={50}
          slidesPerView={1}
          // onSlideChange={() => }
          // onSwiper={(swiper) => }
        >
          {adjectives.map((word) => {
            return (
              <SwiperSlide key={word.content}>
                <p className={word.color}>{word.content}</p>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="slogan__tagline">
        <p>
          Stay<span>in Bergen</span>
        </p>
      </div>
    </div>
  );
}
