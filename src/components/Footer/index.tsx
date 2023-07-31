const Footer = () => {
  return (
    <>
      <section className="widget_section padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 sm-padding">
              <div className="footer_widget">
                <img className="mb-15" src="/img/logo.png" alt="Brand" />
                <p>Our barbershop is the created for men who appreciate premium quality, time and flawless look.
                </p>
                <ul className="widget_social">
                  <li><a href="#"><i className="social_facebook"></i></a></li>
                  <li><a href="#"><i className="social_twitter"></i></a></li>
                  <li><a href="#"><i className="social_googleplus"></i></a></li>
                  <li><a href="#"><i className="social_instagram"></i></a></li>
                  <li><a href="#"><i className="social_linkedin"></i></a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 sm-padding">
              <div className="footer_widget">
                <h3>Headquaters</h3>
                <p>962 Fifth Avenue, 3rd Floor New York, NY10022</p>
                <p><a href="https://html.dynamiclayers.net/cdn-cgi/l/email-protection" className="__cf_email__"
                  data-cfemail="4008252c2c2f0024392e212d29232c21392532336e2e2534">[email&#160;protected]</a>
                  <br />(+123) 456 789 101</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 sm-padding">
              <div className="footer_widget">
                <h3>Opening Hours</h3>
                <ul className="opening_time">
                  <li>Monday - Friday 11:30am - 2:008pm</li>
                  <li>Saturday – Monday: 9am – 8pm</li>
                  <li>Monday - Friday 5:30am - 11:008pm</li>
                  <li>Saturday - Sunday 4:30am - 1:00pm</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-12 sm-padding">
              <div className="footer_widget">
                <h3>Subscribe to our contents</h3>
                <div className="subscribe_form">
                  <form action="#" className="subscribe_form">
                    <input type="email" name="email" id="subs-email" className="form_input rounded"
                      placeholder="Email Address..." />
                    <button type="submit" className="submit rounded">SUBSCRIBE</button>
                    <div className="clearfix"></div>
                    <div id="subscribe-result">
                      <p className="subscription-success"></p>
                      <p className="subscription-error"></p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer_section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 xs-padding">
              <div className="copyright">©
                ROY Barber Shop
              </div>
            </div>
            <div className="col-md-6 xs-padding">
              <ul className="footer_social">
                <li><a href="#">Orders</a></li>
                <li><a href="#">Terms</a></li>
                <li><a href="#">Report Problem</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>

  )
}

export default Footer;