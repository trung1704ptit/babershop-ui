const About = () => {
  return (
    <section id="dich-vu" className="about_section bd-bottom padding">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="about_content align-center">
              <h3 className="wow fadeInUp" data-wow-delay="100ms">Giới thiệu</h3>
              <h2 className="wow fadeInUp" data-wow-delay="200ms">Roy Barber Shop</h2>
              <img className="wow fadeInUp mx-auto" data-wow-delay="500ms" src="/img/about-logo.png" alt="logo" />
              <p className="wow fadeInUp" data-wow-delay="600ms"> Tiệm tóc của chúng tôi là nơi được tạo ra  hoàn toàn dành cho những
                <br /> người đàn ông quan tâm tới chất lượng cao cấp, thời gian và cái nhìn hoàn hảo
              </p>
              <p>Đó không chỉ là một lần cắt tóc, đó là 1 lần trải nghiệm</p>
            </div>
          </div>
          <div className="col-md-6 d-none d-md-block">
            <div className="about_img">
              <img src="/img/about-1.jpg" alt="idea-images" className="about_img_1" />
              <img src="/img/about-2.jpg" alt="idea-images" className="about_img_2" />
              <img src="/img/about-3.jpg" alt="idea-images" className="about_img_3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About;