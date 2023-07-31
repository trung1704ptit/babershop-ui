import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import BookingEntrance from '../BookingEntrance';

const HeroCarousel = () => {
  return (
    <section className='w-full lg:h-[670px] relative'>
      <Swiper
        slidesPerView={1}
        speed={1300}
        loop
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
        }}
        navigation
        modules={[Pagination, Navigation, Autoplay]}
        className='mySwiper'
      >
        <SwiperSlide>
          <li
            className='main_slide d-flex align-items-center'
            style={{ backgroundImage: 'url(/img/slide-1.jpg)' }}
          >
            <div className='container'>
              <div className='slider_content fade-in-out'>
                <h3>Its Not Just a Haircut, Its an Experience.</h3>
                <h1>
                  Being a barber is about <br />
                  taking care of the people.
                </h1>
                <p>
                  Our barbershop is the territory created purely for males who
                  appreciate
                  <br /> premium quality, time and flawless look.
                </p>
              </div>
            </div>
          </li>
        </SwiperSlide>
        <SwiperSlide>
          <li
            className='main_slide d-flex align-items-center'
            style={{ backgroundImage: 'url(/img/slide-2.jpg)' }}
          >
            <div className='container'>
              <div className='slider_content fade-in-out'>
                <h3>Classic Hair Style &amp; Shaves.</h3>
                <h1>
                  Our hair styles
                  <br />
                  enhances your smile.
                </h1>
                <p>
                  Our barbershop is the territory created purely for males who
                  appreciate
                  <br /> premium quality, time and flawless look.
                </p>
              </div>
            </div>
          </li>
        </SwiperSlide>
        <SwiperSlide>
          <li
            className='main_slide d-flex align-items-center'
            style={{ backgroundImage: 'url(/img/slide-3.jpg)' }}
          >
            <div className='container'>
              <div className='slider_content fade-in-out'>
                <h3>Its Not Just a Haircut, Its an Experience.</h3>
                <h1>
                  Where mens want <br />
                  to look there very best.
                </h1>
                <p>
                  Our barbershop is the territory created purely for males who
                  appreciate
                  <br /> premium quality, time and flawless look.
                </p>
              </div>
            </div>
          </li>
        </SwiperSlide>
      </Swiper>
      <div className="lg:absolute top-[100px] right-[200px] center"><BookingEntrance /></div>
    </section >
  );
};

export default HeroCarousel;
