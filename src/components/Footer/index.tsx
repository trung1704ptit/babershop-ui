const Footer = () => {
  return (
    <footer className="footer_section">
      <div className="container">
        <div className="row">
          <div className="col-md-6 xs-padding">
            <div className="copyright">©
              Barber Shop
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
  )
}

export default Footer;