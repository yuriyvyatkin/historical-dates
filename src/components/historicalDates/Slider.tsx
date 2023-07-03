import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperCore, { Pagination, Navigation } from 'swiper';

interface slideData {
  year: number;
  description: string;
}

interface SliderProps {
  sliderData: slideData[];
}

export default function Slider({ sliderData }: SliderProps) {
  const pagination = {
    el: '.swiper__pagination',
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<span class="${className}"></span>`;
    },
  };

  return (
    <div className="swiper__wrapper">
      <Swiper
        slidesPerView={3}
        pagination={pagination}
        navigation={{
          prevEl: '.swiper__button-prev',
          nextEl: '.swiper__button-next',
        }}
        modules={[Pagination, Navigation]}
        className=".swiper"
      >
        {sliderData.map((item: slideData) => {
          return (
            <SwiperSlide key={item.year}>
              <div className="swiper-slide__title">{item.year}</div>
              <div className="swiper-slide__description">
                {item.description}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <button className="swiper__button-prev"></button>
      <button className="swiper__button-next"></button>
      <div className="swiper__pagination"></div>
    </div>
  );
}
