const Services = () => {
  return (
    <section className="service_section bg-grey padding">
      <div className="container">
        <div className="section_heading text-center mb-40 wow fadeInUp" data-wow-delay="300ms">
          <h3>Trendy Salon &amp; Spa</h3>
          <h2>Our Services</h2>
          <div className="heading-line" />
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 sm-padding wow fadeInUp" data-wow-delay="200ms">
            <div className="service_box">
              <i className="bs bs-scissors-1" />
              <h3>Haircut Styles</h3>
              <p>Barber is a person whose occupation is mainly to cut dress style.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 sm-padding wow fadeInUp" data-wow-delay="300ms">
            <div className="service_box">
              <i className="bs bs-razor-2" />
              <h3>Beard Triming</h3>
              <p>Barber is a person whose occupation is mainly to cut dress style.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 sm-padding wow fadeInUp" data-wow-delay="400ms">
            <div className="service_box">
              <i className="bs bs-brush" />
              <h3>Smooth Shave</h3>
              <p>Barber is a person whose occupation is mainly to cut dress style.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 sm-padding wow fadeInUp" data-wow-delay="500ms">
            <div className="service_box">
              <i className="bs bs-hairbrush-1" />
              <h3>Face Masking</h3>
              <p>Barber is a person whose occupation is mainly to cut dress style.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services;