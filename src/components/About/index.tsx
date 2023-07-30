const About = () => {
  return (
    <section id="about" className="about_section bd-bottom padding">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="about_content align-center">
              <h3 className="wow fadeInUp" data-wow-delay="100ms">Introducing</h3>
              <h2 className="wow fadeInUp" data-wow-delay="200ms">The Barber Shop <br />Science 1991</h2>
              <img className="wow fadeInUp mx-auto" data-wow-delay="500ms" src="img/about-logo.png" alt="logo" />
              <p className="wow fadeInUp" data-wow-delay="600ms">Barber is a person whose occupation is mainly to
                cut dress groom style and shave men's and boys' hair. A barber's place of work is known as a
                "barbershop" or a "barber's". Barbershops are also places of social interaction and public
                discourse. In some instances, barbershops are also public forums.</p>
              <a href="#" className="default_btn wow fadeInUp" data-wow-delay="600ms">More About Us</a>
            </div>
          </div>
          <div className="col-md-6 d-none d-md-block">
            <div className="about_img">
              <img src="img/about-1.jpg" alt="idea-images" className="about_img_1 wow fadeInLeft" data-wow-delay="200ms" />
              <img src="img/about-2.jpg" alt="idea-images" className="about_img_2 wow fadeInRight" data-wow-delay="400ms" />
              <img src="img/about-3.jpg" alt="idea-images" className="about_img_3 wow fadeInLeft" data-wow-delay="600ms" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About;