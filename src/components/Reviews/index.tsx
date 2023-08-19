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
        speed={4000}
        loop
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
        }}
        modules={[Pagination, Autoplay]}
        className='testimonial'
      >
        <SwiperSlide>
          <div className="testimonial_item mb-4">
            <p>"Cắt tóc tại Roy Barber shop tôi cảm thấy mình được chăm sóc tận tình, tư vấn chu đáo.<br />
              Tay nghề của barbers tại đây thì hoàn toàn yên tâm"</p>
            <h4 className="text-white">Trung Nguyễn - Kỹ sư IT.</h4>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="testimonial_item mb-4">
            <p>"Tôi chưa từng được trải nghiệm kiểu cắt tóc như Roy Barber shop bao giờ<br />
              Phục vụ rất tốt, giá cả phải chăng, tôi sẽ còn quay lại đây nhiều"</p>
            <h4 className="text-white">Tống Dũng - Kỹ sư</h4>
          </div>

        </SwiperSlide>
        <SwiperSlide>
          <div className="testimonial_item mb-4">
            <p>"Tôi vô cùng thích cảm giác được thư giãn mỗi khi đến Roy Barber shop<br />
              được cắt tóc và được tư vấn miễn phí"</p>
            <h4 className="text-white">Anh Đồng Nguyễn</h4>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  )
}

export default Reviews;