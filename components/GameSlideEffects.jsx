"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-creative";

import { EffectCreative, Autoplay } from "swiper/modules";
import Image from "next/image";

const InteractiveSliders = () => {
  return (
    <>
      <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectCreative, Autoplay]}
      >
        <SwiperSlide>
          <Image
            src="/images/interactive-game-1.jpg"
            alt="interactive game console 1"
            width={580}
            height={580}
            className="object-cover h-full w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/interactive-game-2.jpg"
            alt="interactive game console 1"
            width={580}
            height={580}
            className="object-cover h-full w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/interactive-game-3.jpg"
            alt="interactive game console 1"
            width={580}
            height={580}
            className="object-cover h-full w-full"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default InteractiveSliders;
