'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Image from 'next/image';


const SwiperComponent = ({ images }: { images: string[] }) => {
    return (
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={3}
        navigation={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={true}
        style={{
          '--swiper-navigation-color': '#ffffff',
          '--swiper-pagination-color': '#ffffff',
          width: '66%', // Alterado para ocupar mais espaço horizontal
          margin: '0 auto',// Centraliza o componente na página//* top and bottom | left and right */
      
        } as React.CSSProperties}
      >
        {images.map((image: string) => (
          <SwiperSlide key={image.split('/').pop()?.split('.').shift()}>
            <Image
              src={image}
              alt=""
              width={300}
              height={200}
              className="w-48 h-36 mr-1 mb-1 swiper-slide"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };
  

export default SwiperComponent;