const Team = () => {
  return (
    <section id="team" className="team_section bd-bottom padding">
      <div className="container">
        <div className="section_heading text-center mb-40 wow fadeInUp" data-wow-delay="300ms">
          <h3>Trendy Salon &amp; Spa</h3>
          <h2>Our Barbers</h2>
          <div className="heading-line" />
        </div>
        <ul className="team_members row justify-center">
          <li className="col-lg-3 col-md-6 sm-padding wow fadeInUp" data-wow-delay="200ms">
            <div className="team_member">
              <img src="/img/barber1.png" alt="Team Member1" />
              <div className="overlay">
                <h3>Kyle Frederick</h3>
                <p>WEB DESIGNER</p>
              </div>
            </div>
          </li>
          <li className="col-lg-3 col-md-6 sm-padding wow fadeInUp" data-wow-delay="300ms">
            <div className="team_member">
              <img src="/img/barber2.png" alt="Team Member2" />
              <div className="overlay">
                <h3>José Carpio</h3>
                <p>WORDPRESS DEVELOPER</p>
              </div>
            </div>
          </li>
          <li className="col-lg-3 col-md-6 sm-padding wow fadeInUp" data-wow-delay="400ms">
            <div className="team_member">
              <img src="/img/barber3.png" alt="Team Member3" />
              <div className="overlay">
                <h3>Michel Ibáñez</h3>
                <p>ONLINE MARKETER</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Team;