// components/TestimonialsSlider.tsx

'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import './TestimonialsSlider.css';

type Testimonial = {
  quote: string;
  author: string;
};

type TestimonialsSliderProps = {
  testimonials: Testimonial[];
};

export default function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
  const swiperRef = useRef<any>(null);
  const handleMouseEnter = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
      swiperRef.current.setTransition(0);
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current) {
      swiperRef.current.setTransition(6000);
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <div
      className="testimonials-slider w-full max-w-[99vw]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Autoplay]}
        slidesPerView={'auto'}
        spaceBetween={55}
        loop={true}
        speed={6000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="mySwiper"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="flex gap-3">
              <blockquote className="font-inter font-normal italic text-center text-base">&quot;{testimonial.quote}&quot;</blockquote>
              <p className="font-inter font-medium italic text-center text-base">{testimonial.author}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}