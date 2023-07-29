import Head from 'next/head';
import Script from 'next/script';

import { About, Footer, Header, HeroCarousel, Pricing, Reviews, Services, Team } from '../components';


export default function Home() {
  return (
    <>
      <Head>
        <title>Barbershop Quang hair</title>
        <meta
          name='description'
          content={`
          A ready-to-use starter template for building fast and modern web applications.
          Includes basic configurations and optimizations for
          optimal performance and development experience.
        `}
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div>
        {/* <Loading /> */}
        <Header />
        <HeroCarousel />
        <About />
        <Services />
        <section className="book_section padding">
          <div className="book_bg" />
          <div className="map_pattern" />
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-6">
                <form action="https://html.dynamiclayers.net/dl/barbershop/appointment.php" method="post" id="appointment_form" className="form-horizontal appointment_form">
                  <div className="book_content">
                    <h2>Make an appointment</h2>
                    <p>Barber is a person whose occupation is mainly to cut dress groom <br />style and shave
                      men's and boys hair.</p>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6 padding-10">
                      <input type="text" id="app_name" name="app_name" className="form-control" placeholder="Name" required />
                    </div>
                    <div className="col-md-6 padding-10">
                      <input type="email" id="app_email" name="app_email" className="form-control" placeholder="Your Email" required />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6 padding-10">
                      <input type="text" id="app_phone" name="app_phone" className="form-control" placeholder="Your Phone No" required />
                    </div>
                    <div className="col-md-6 padding-10">
                      <input type="text" id="app_free_time" name="app_free_time" className="form-control" placeholder="Your Free Time" required />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6 padding-10">
                      <select className="form-control" id="app_services" name="app_services">
                        <option>Services</option>
                        <option>Hair Styling</option>
                        <option>Shaving</option>
                        <option>Face Mask</option>
                        <option>Hair Wash</option>
                        <option>Beard Triming</option>
                      </select>
                    </div>
                    <div className="col-md-6 padding-10">
                      <select className="form-control" id="app_barbers" name="app_barbers">
                        <option>Choose Barbers</option>
                        <option>Michel Brown</option>
                        <option>Jonathan Smith</option>
                        <option>Jack Tosan</option>
                        <option>Martin Lane</option>
                      </select>
                    </div>
                  </div>
                  <button id="app_submit" className="default_btn" type="submit">Make Appointment</button>
                  <div id="msg-status" className="alert" role="alert" />
                </form>
              </div>
            </div>
          </div>
        </section>
        <Team />
        <Reviews />
        <Pricing />
        <section className="cta_section padding">
          <div className="container">
            <div className="display-table">
              <div className="table-cel">
                <div className="cta_content align-center wow fadeInUp" data-wow-delay="300ms">
                  <h2>Making You Look Good <br /> Is In Our Haritage.</h2>
                  <p>Barber is a person whose occupation is mainly to cut dress groom <br />style and shave men's
                    and boys hair.</p>
                  <a href="#" className="default_btn">Make Appointment</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="blog-section bd-bottom padding">
          <div className="container">
            <div className="section-heading text-center mb-40 wow fadeInUp" data-wow-delay="300ms">
              <h3>From Blog</h3>
              <h2>A Good Newspaper Is A <br /> Nation Talking To Itself</h2>
            </div>
            <div className="row blog-wrap">
              <div className="col-lg-4 col-md-6 sm-padding wow fadeInUp" data-wow-delay="200ms">
                <div className="blog-item">
                  <div className="blog-thumb">
                    <img src="img/post-1.jpg" alt="post" />
                    <span className="category"><a href="#">interior</a></span>
                  </div>
                  <div className="blog-content">
                    <h3><a href="#">Minimalist trending in modern architecture 2019</a></h3>
                    <p>Building first evolved out dynamics between needs means available building materials
                      attendant skills.</p>
                    <a href="#" className="read-more">Read More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 sm-padding wow fadeInUp" data-wow-delay="300ms">
                <div className="blog-item">
                  <div className="blog-thumb">
                    <img src="img/post-2.jpg" alt="post" />
                    <span className="category"><a href="#">Architecture</a></span>
                  </div>
                  <div className="blog-content">
                    <h3><a href="#">Terrace in the town yamazaki kentaro design workshop.</a></h3>
                    <p>Building first evolved out dynamics between needs means available building materials
                      attendant skills.</p>
                    <a href="#" className="read-more">Read More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 sm-padding wow fadeInUp" data-wow-delay="400ms">
                <div className="blog-item">
                  <div className="blog-thumb">
                    <img src="img/post-3.jpg" alt="post" />
                    <span className="category"><a href="#">Design</a></span>
                  </div>
                  <div className="blog-content">
                    <h3><a href="#">W270 house são paulo arquitetos fabio jorge architeqture.</a></h3>
                    <p>Building first evolved out dynamics between needs means available building materials
                      attendant skills.</p>
                    <a href="#" className="read-more">Read More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="widget_section padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 sm-padding">
                <div className="footer_widget">
                  <img className="mb-15" src="img/logo.png" alt="Brand" />
                  <p>Our barbershop is the created for men who appreciate premium quality, time and flawless look.
                  </p>
                  <ul className="widget_social">
                    <li><a href="#"><i className="social_facebook" /></a></li>
                    <li><a href="#"><i className="social_twitter" /></a></li>
                    <li><a href="#"><i className="social_googleplus" /></a></li>
                    <li><a href="#"><i className="social_instagram" /></a></li>
                    <li><a href="#"><i className="social_linkedin" /></a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 sm-padding">
                <div className="footer_widget">
                  <h3>Headquaters</h3>
                  <p>962 Fifth Avenue, 3rd Floor New York, NY10022</p>
                  <p><a href="https://html.dynamiclayers.net/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="4008252c2c2f0024392e212d29232c21392532336e2e2534">[email&nbsp;protected]</a>
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
                      <input type="email" name="email" id="subs-email" className="form_input" placeholder="Email Address..." />
                      <button type="submit" className="submit">SUBSCRIBE</button>
                      <div className="clearfix" />
                      <div id="subscribe-result">
                        <p className="subscription-success" />
                        <p className="subscription-error" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
        <a data-scroll href="#header" id="scroll-to-top"><i className="arrow_up" /></a>
      </div>
      <Script src="js/vendor/jquery-1.12.4.min.js" />
      <Script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js" />
      <Script src="js/vendor/bootstrap.min.js" />
      <Script src="js/vendor/imagesloaded.pkgd.min.js" />
      <Script src="js/vendor/owl.carousel.min.js" />
      <Script src="js/vendor/jquery.isotope.v3.0.2.js" />
      <Script src="js/vendor/smooth-scroll.min.js" />
      <Script src="js/vendor/venobox.min.js" />
      <Script src="js/vendor/jquery.ajaxchimp.min.js" />
      <Script src="js/vendor/jquery.slicknav.min.js" />
      <Script src="js/vendor/jquery.nice-select.min.js" />
      <Script src="js/vendor/jquery.mb.YTPlayer.min.js" />
      <Script src="js/vendor/wow.min.js" />
      <Script src="js/contact.js" />
      <Script src="js/appointment.js" />
      <Script src="js/main.js" />
    </>
  );
}
