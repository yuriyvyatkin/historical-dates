import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperCore, { Pagination, Navigation } from 'swiper';

export default function MySwiper() {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<span class="${className} ${className}-${index}'">${index + 1}</span>`;
    }
  };

  const periodsSwiperRef = useRef<SwiperCore | null>(null);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);

  // useEffect(() => {
  //   setcurrentPage(periodsSwiperRef.current?.activeIndex);
  // }, [periodsSwiperRef])


  const goPrev = () => {
    // periodsSwiperRef.current?.slideTo(5);
    // setCurrentPage(prevPage => prevPage && prevPage - 1);
    // if (ref.current !== null && ref.current.current !== null) {
    //   ref.current.current.slidePrev();
    // }
  };

  const goNext = () => {
    // setCurrentPage(prevPage => prevPage && prevPage + 1);
    // if (ref.current !== null && ref.current.current !== null) {
    //   ref.current.current.slideNext();
    // }
  };

  return (
    <>
      <Swiper
        direction="vertical"
        effect="flip"
        pagination={pagination}
        navigation={{
          prevEl: '.custom-swiper-button-prev',
          nextEl: '.custom-swiper-button-next'
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        onInit={(swiper) => {
          periodsSwiperRef.current = swiper;
          // swiper.effect = 'cube';
        }}
        onSlideChange={(swiper) => {
          setCurrentPage(swiper.activeIndex + 1);
          // swiper.effect = 'cube';
        }}
      >
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
      </Swiper>
      <button className="custom-swiper-button-prev" onClick={goPrev}>Prev</button>
      <button className="custom-swiper-button-next" onClick={goNext}>Next</button>
      <span>{`0${currentPage}/06`}</span>
    </>
  );
}
