
const Header = () => {
  return (
    <header id="header" className="header-section">
      <div className="container">
        <nav className="navbar ">
          <a href="#" className="navbar-brand"><img src="img/logo.png" alt="Barbershop" /></a>
          <div className="d-flex menu-wrap align-items-center">
            <div id="mainmenu" className="mainmenu">
              <ul className="nav">
                <li><a data-scroll className="nav-link active" href="index-2.html">Home<span className="sr-only">(current)</span></a>
                  <ul>
                    <li><a href="index-2.html">Home Default</a></li>
                    <li><a href="index-3.html">Home Modern</a></li>
                    <li><a href="index-4.html">Home Classic</a></li>
                  </ul>
                </li>
                <li><a href="about-us.html">About</a>
                  <ul>
                    <li><a href="about-us.html">About Us</a></li>
                    <li><a href="about-company.html">About Company</a></li>
                  </ul>
                </li>
                <li><a href="services.html">Services</a>
                  <ul>
                    <li><a href="services.html">Services 01</a></li>
                    <li><a href="services-2.html">Services 02</a></li>
                  </ul>
                </li>
                <li><a href="#">Pages</a>
                  <ul>
                    <li><a href="appointment.html">Appointment</a></li>
                    <li><a href="gallery.html">Gallery</a></li>
                    <li><a href="team.html">Our Team</a></li>
                    <li><a href="pricing.html">Our Pricing</a></li>
                    <li><a href="404.html">404 Error</a></li>
                  </ul>
                </li>
                <li><a href="#">Blog</a>
                  <ul>
                    <li><a href="blog-grid.html">Blog Grid</a></li>
                    <li><a href="blog-classic.html">Blog Classic</a></li>
                    <li><a href="blog-single.html">Blog Single</a></li>
                  </ul>
                </li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>
            <div className="header-btn">
              <a href="#" className="menu-btn">Make Appointment</a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header;