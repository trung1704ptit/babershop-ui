const About = () => {
  return (
    <section id="dich-vu" className="about_section bd-bottom padding">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="about_content align-center">
              <h3 className="wow fadeInUp" data-wow-delay="100ms">Giới thiệu</h3>
              <h2 className="wow fadeInUp" data-wow-delay="200ms">Roy Barber Shop</h2>
              <img className="wow fadeInUp mx-auto h-[80px]" src="/img/about-logo.png" alt="logo" />
              <p className="wow fadeInUp text-lg" data-wow-delay="600ms">
                ROY BarberShop được thành lập 07/2023 với 4 thành viên ban đầu gồm Founder Mr Quang , Manager Ms Linh , Barber Lương , Barber Đạt.
                Với nhiều năm làm việc tại chuỗi cửa hàng tóc nam nổi tiếng và đặc biệt hơn hết khi Founder Quang đã từng làm việc tại House of Barbaard một barbershop hoàn hảo nhất tại Việt Nam.
                <br />
                Quang đã thu hoạch được nhiều khinh nghiệm từ nhiều khía cạnh để tạo nên ROY BarberShop ngày nay.
                Với kinh nghiệm dày dặn và thái độ rất chuẩn mực của ngành nghề chúng tôi tự tin mang lại sự ấn tượng và hài lòng cho khách hàng.
              </p>
            </div>
          </div>
          <div className="col-md-6 d-md-block">
            <div className="about_img">
              <img src="/img/about-preview.jpg" alt="idea-images" className="about_img_1" />

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About;