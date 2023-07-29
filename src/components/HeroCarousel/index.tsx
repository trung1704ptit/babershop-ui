const HeroCarousel = () => {
  return (
    <section className="slider_section">
      <ul id="main-slider" className="owl-carousel main_slider">
        <li className="main_slide d-flex align-items-center" style={{ backgroundImage: 'url(img/slide-1.jpg)' }}>
          <div className="container">
            <div className="slider_content">
              <h3>Its Not Just a Haircut, Its an Experience.</h3>
              <h1>Being a barber is about <br />taking care of the people.</h1>
              <p>Our barbershop is the territory created purely for males who appreciate<br /> premium quality,
                time and flawless look.</p>
              <a href="#" className="default_btn">Make Appointment</a>
            </div>
          </div>
        </li>
        <li className="main_slide d-flex align-items-center" style={{ backgroundImage: 'url(img/slide-2.jpg)' }}>
          <div className="container">
            <div className="slider_content">
              <h3>Classic Hair Style &amp; Shaves.</h3>
              <h1>Our hair styles<br />enhances your smile.</h1>
              <p>Our barbershop is the territory created purely for males who appreciate<br /> premium quality,
                time and flawless look.</p>
              <a href="#" className="default_btn">Make Appointment</a>
            </div>
          </div>
        </li>
        <li className="main_slide d-flex align-items-center" style={{ backgroundImage: 'url(img/slide-3.jpg)' }}>
          <div className="container">
            <div className="slider_content">
              <h3>Its Not Just a Haircut, Its an Experience.</h3>
              <h1>Where mens want <br />to look there very best.</h1>
              <p>Our barbershop is the territory created purely for males who appreciate<br /> premium quality,
                time and flawless look.</p>
              <a href="#" className="default_btn">Make Appointment</a>
            </div>
          </div>
        </li>
      </ul>
    </section>
  )
}

export default HeroCarousel;