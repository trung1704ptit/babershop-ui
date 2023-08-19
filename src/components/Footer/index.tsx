const Footer = () => {
  return (
    <>
      <section className="widget_section padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 sm-padding">
              <div className="footer_widget">
                <img className="mb-15" src="/img/logo.png" alt="Brand" />
                <p>Tiệm tóc của chúng tôi là nơi được tạo ra hoàn toàn dành cho những
                  người đàn ông quan tâm tới chất lượng cao cấp, thời gian và cái nhìn hoàn hảo</p>
                <ul className="widget_social">
                  <li><a href="https://www.facebook.com/profile.php?id=100093992629830"><i className="social_facebook"></i></a></li>
                  <li><a href="#"><i className="social_twitter"></i></a></li>
                  <li><a href="#"><i className="social_googleplus"></i></a></li>
                  <li><a href="#"><i className="social_instagram"></i></a></li>
                  <li><a href="#"><i className="social_linkedin"></i></a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 sm-padding">
              <div className="footer_widget">
                <h3>Địa chỉ</h3>
                <p>783 Âu Cơ, phố Hồ, Thị xã Thuận Thành, Bắc Ninh</p>
                <p>0869.825.633</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 sm-padding">
              <div className="footer_widget">
                <h3>Mở cửa</h3>
                <ul className="opening_time">
                  <li>Tất cả các ngày trong tuần từ 8h-22h30</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer_section">
        <div className="container">
          <div className="text-center">
            <div className="copyright">©{new Date().getFullYear()} Bản quyền thuộc về ROY Barber Shop
            </div>
          </div>
        </div>
      </footer>
    </>

  )
}

export default Footer;