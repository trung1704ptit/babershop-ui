import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Reviews = () => {
  return (
    <section id="reviews" className="testimonial_section padding">
      <Swiper
        slidesPerView={1}
        speed={1300}
        // loop
        pagination={{
          clickable: true,
        }}
        // autoplay={{
        //   delay: 2000,
        // }}
        modules={[Pagination, Autoplay]}
        className='testimonial'
      >
        <SwiperSlide>
          <div className="testimonial_item mb-4">
            <p>"There are design companies, and then there are user experience design interface design<br />
              professional. By far one of the worlds best known brands."</p>
            <h4 className="text-white">Anita Tran, IT Solutions.</h4>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="testimonial_item mb-4">
            <p>"There are design companies, and then there are user experience design interface design<br />
              professional. By far one of the worlds best known brands."</p>
            <h4 className="text-white">Leslie Williamson, Developer.</h4>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="testimonial_item mb-4">
            <p>"There are design companies, and then there are user experience design interface design<br />
              professional. By far one of the worlds best known brands."</p>
            <h4 className="text-white">Fred Moody, Network Software.</h4>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  )
}

export default Reviews;