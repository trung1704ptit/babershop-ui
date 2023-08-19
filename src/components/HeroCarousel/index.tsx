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
                <h3>Đó không chỉ là một lần cắt tóc, đó là 1 lần trải nghiệm</h3>
                <h1>
                  Trở thành một thợ cắt tóc <br />
                  là chăm sóc mái tóc
                  <br />
                  cho mọi người
                </h1>
                <p>
                  Tiệm tóc của chúng tôi là nơi được tạo ra  hoàn toàn dành cho những
                  <br /> người đàn ông quan tâm tới chất lượng cao cấp, thời gian và cái nhìn hoàn hảo
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
                <h3>Đó không chỉ là một lần cắt tóc, đó là 1 lần trải nghiệm</h3>
                <h1>
                  Nơi đàn ông muốn tán gẫu
                  <br />
                  rất phù hợp
                </h1>
                <p>
                  Tiệm tóc của chúng tôi là nơi được tạo ra  hoàn toàn dành cho những
                  <br /> người đàn ông quan tâm tới chất lượng cao cấp, thời gian và cái nhìn hoàn hảo
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
                <h3>Đó không chỉ là một lần cắt tóc, đó là 1 lần trải nghiệm</h3>
                <h1>
                  Kiểu tóc của chúng tôi <br />
                  mang đến nụ cười cho bạn
                </h1>
                <p>
                  Tiệm tóc của chúng tôi là nơi được tạo ra  hoàn toàn dành cho những
                  <br /> người đàn ông quan tâm tới chất lượng cao cấp, thời gian và cái nhìn hoàn hảo
                </p>
              </div>
            </div>
          </li>
        </SwiperSlide>
      </Swiper>
      <div className="-mt-[150px] lg:mt-0 lg:absolute top-[100px] right-[200px] center"><BookingEntrance /></div>
    </section >
  );
};

export default HeroCarousel;
