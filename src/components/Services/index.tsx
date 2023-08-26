const Services = () => {
  return (
    <section className="service_section bg-grey padding" id="dich-vu">
      <div className="container">
        <div className="section_heading text-center mb-40 wow fadeInUp" data-wow-delay="300ms">
          <h2>Dịch vụ của chúng tôi</h2>
          <div className="heading-line" />
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 sm-padding wow fadeInUp" data-wow-delay="200ms">
            <div className="service_box">
              <i className="bs bs-scissors-1" />
              <h3>Cắt tóc</h3>
              <p className="m-0">Cắt tóc hoàn hảo, Tư vấn cắt, Gội và vuốt tạo kiểu</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 sm-padding wow fadeInUp" data-wow-delay="300ms">
            <div className="service_box">
              <i className="bs bs-razor-2" />
              <h3>Cạo râu</h3>
              <p className="m-0">Phong cách BarberShop cổ điển thư giãn cùng khăn nóng kèm tinh dầu thơm</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 sm-padding wow fadeInUp" data-wow-delay="400ms">
            <div className="service_box">
              <i className="bs bs-brush" />
              <h3>Hóa chất</h3>
              <p className="m-0">Sửa dụng các loại hóa chất an toàn, yên tâm khi sử dụng</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 sm-padding wow fadeInUp" data-wow-delay="500ms">
            <div className="service_box">
              <i className="bs bs-hairbrush-1" />
              <h3>Sản phẩm</h3>
              <p className="m-0">Sản phầm tin cậy, đẳng cấp vượt trội</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services;