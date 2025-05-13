// components/TestimonialsSlider.tsx

'use client';

import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import './TestimonialsSlider.css';
import type { Swiper as SwiperClass } from 'swiper/types';

type Testimonial = {
  quote: string;
  author: string;
};

type TestimonialsSliderProps = {
  testimonials: Testimonial[];
};

export default function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
  const swiperRef = useRef<SwiperClass | null>(null);
  
  const handleMouseEnter = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.update();
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="testimonials-slider w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Autoplay]}
        slidesPerView="auto"
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
          <SwiperSlide key={index} className="!w-auto">
            <div className="flex gap-3 items-center">
              <blockquote className="font-inter font-normal italic text-center text-base">&quot;{testimonial.quote}&quot;</blockquote>
              <p className="font-inter font-medium italic text-center text-base whitespace-nowrap">{testimonial.author}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}